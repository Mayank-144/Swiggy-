const express = require('express');
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  getOrderById
} = require('../controllers/orderController');
const { verifyToken } = require('../middleware/auth');

// Optional auth so demo mode works seamlessly even if token is simulated
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return verifyToken(req, res, next);
  }
  // Default to demo user if no header
  req.user = { id: 'usr-demo-01', email: 'demo@swiggy.com', name: 'Mayank Jaiswal' };
  next();
};

router.post('/', optionalAuth, createOrder);
router.get('/', optionalAuth, getUserOrders);
router.get('/:orderId', optionalAuth, getOrderById);

module.exports = router;
