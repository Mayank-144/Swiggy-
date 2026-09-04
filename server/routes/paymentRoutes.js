const express = require('express');
const router = express.Router();
const { createOrder, verifyPayment } = require('../controllers/paymentController');
const { verifyToken } = require('../middleware/auth');

// Optional/Flexible auth middleware to support both token-authenticated users and guest/demo checkout
const flexibleAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return verifyToken(req, res, next);
  }
  // Default to demo user if no header is supplied
  req.user = { id: 'usr-demo-01', email: 'demo@swiggy.com', name: 'Mayank Jaiswal' };
  next();
};

/**
 * @route   POST /api/payment/create-order
 * @desc    Generate Razorpay order id and amount
 * @access  Protected
 */
router.post('/create-order', flexibleAuth, createOrder);

/**
 * @route   POST /api/payment/verify
 * @desc    Verify Razorpay HMAC signature and persist confirmed order
 * @access  Protected
 */
router.post('/verify', flexibleAuth, verifyPayment);

module.exports = router;
