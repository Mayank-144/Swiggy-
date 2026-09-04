require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB, getDBStatus } = require('./config/db');
const Restaurant = require('./models/Restaurant');
const { restaurants: seedRestaurants } = require('./data/restaurantsData');

// Import routes
const authRoutes = require('./routes/authRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    message: 'Swiggy Clone API is running smoothly 🚀',
    database: getDBStatus() ? 'MongoDB Connected' : 'In-Memory High Speed Store',
    timestamp: new Date().toISOString()
  });
});

// Serve frontend (Production & Built SPA)
const path = require('path');
const fs = require('fs');

const clientDistPath = path.join(__dirname, '../client/dist');
const indexHtmlPath = path.join(clientDistPath, 'index.html');

if (fs.existsSync(clientDistPath) && fs.existsSync(indexHtmlPath)) {
  console.log('📁 Serving static frontend from:', clientDistPath);
  app.use(express.static(clientDistPath));
  app.get('*', (req, res) => {
    if (req.path.startsWith('/api')) {
      return res.status(404).json({ success: false, message: 'API route not found' });
    }
    res.sendFile(indexHtmlPath);
  });
} else {
  app.get('/', (req, res) => {
    res.json({
      name: 'Swiggy Clone MERN API',
      version: '1.0.0',
      status: 'online',
      message: 'Swiggy Clone backend is running! Build frontend to see UI.',
      documentation: {
        auth: '/api/auth',
        restaurants: '/api/restaurants',
        orders: '/api/orders',
        health: '/api/health'
      }
    });
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Something broke internally in the server!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start Server and seed if needed
const startServer = async () => {
  const isMongo = await connectDB();
  if (isMongo) {
    try {
      const count = await Restaurant.countDocuments();
      if (count === 0) {
        console.log('🌱 Seeding initial restaurant catalog into MongoDB...');
        await Restaurant.insertMany(seedRestaurants);
        console.log(`✅ Successfully seeded ${seedRestaurants.length} restaurants into MongoDB!`);
      }
    } catch (e) {
      console.warn('Seed notice:', e.message);
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Swiggy Clone Server running on http://0.0.0.0:${PORT}`);
  });
};

startServer();
