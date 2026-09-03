const express = require('express');
const router = express.Router();
const {
  getAllRestaurants,
  getRestaurantById,
  getCategories
} = require('../controllers/restaurantController');

router.get('/', getAllRestaurants);
router.get('/categories', getCategories);
router.get('/:id', getRestaurantById);

module.exports = router;
