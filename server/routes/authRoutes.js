const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getMe,
  updateProfile,
  addAddress,
  toggleFavorite
} = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', verifyToken, getMe);
router.put('/profile', verifyToken, updateProfile);
router.post('/address', verifyToken, addAddress);
router.post('/favorites/:restaurantId', verifyToken, toggleFavorite);

module.exports = router;
