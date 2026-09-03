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

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    message: 'Swiggy Clone API is running smoothly 🚀',
    database: getDBStatus() ? 'MongoDB Connected' : 'In-Memory High Speed Store',
    timestamp: new Date().toISOString()
  });
});

// Serve frontend in production (Render deployment)
const path = require('path');
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.json({
      name: 'Swiggy Clone MERN API',
      version: '1.0.0',
      documentation: {
        auth: '/api/auth',
        restaurants: '/api/restaurants',
        orders: '/api/orders',
        payment: '/api/payment'
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

  app.listen(PORT, () => {
    console.log(`🚀 Swiggy Clone Server running on http://localhost:${PORT}`);
  });
};

startServer();
