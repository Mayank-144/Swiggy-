const express = require('express');
const router = express.Router();
const {
  getAllRestaurants,
  getRestaurantById,
  getCategories,
  getSearchSuggestions
} = require('../controllers/restaurantController');

router.get('/', getAllRestaurants);
router.get('/categories', getCategories);
router.get('/suggestions', getSearchSuggestions);
router.get('/:id', getRestaurantById);

module.exports = router;
