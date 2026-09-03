const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/swiggy_clone', {
      serverSelectionTimeoutMS: 2500, // Quick timeout if Mongo isn't running locally
    });
    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`⚠️ MongoDB connection skipped (${error.message}).`);
    console.log(`💡 Swiggy Clone will run seamlessly using High-Performance In-Memory DB & Seed Data!`);
    isConnected = false;
    return false;
  }
};

const getDBStatus = () => isConnected;

module.exports = { connectDB, getDBStatus };
