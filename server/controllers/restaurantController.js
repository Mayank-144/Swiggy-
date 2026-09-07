const Restaurant = require('../models/Restaurant');
const { getDBStatus } = require('../config/db');
const { restaurants: seedRestaurants, categories: seedCategories } = require('../data/restaurantsData');

// Local in-memory storage
let inMemoryRestaurants = [...seedRestaurants];

// @route   GET /api/restaurants
exports.getAllRestaurants = async (req, res) => {
  try {
    const {
      search,
      cuisine,
      vegOnly,
      minRating,
      maxDeliveryTime,
      sortBy, // 'rating', 'deliveryTime', 'costLowToHigh', 'costHighToLow'
      promoted
    } = req.query;

    let results = [];

    if (getDBStatus()) {
      let query = {};

      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { cuisines: { $regex: search, $options: 'i' } },
          { 'menuCategories.items.name': { $regex: search, $options: 'i' } }
        ];
      }

      if (cuisine && cuisine !== 'all') {
        query.cuisines = { $regex: cuisine, $options: 'i' };
      }

      if (vegOnly === 'true') {
        query.isVeg = true;
      }

      if (minRating) {
        query.rating = { $gte: parseFloat(minRating) };
      }

      if (promoted === 'true') {
        query.isPromoted = true;
      }

      let sortOptions = {};
      if (sortBy === 'rating') sortOptions.rating = -1;
      else if (sortBy === 'deliveryTime') sortOptions.deliveryTimeMinutes = 1;
      else if (sortBy === 'costLowToHigh') sortOptions.priceForTwo = 1;
      else if (sortBy === 'costHighToLow') sortOptions.priceForTwo = -1;

      results = await Restaurant.find(query).sort(sortOptions);

      // If DB is connected but empty, return seeds
      if (results.length === 0 && !search && (!cuisine || cuisine === 'all')) {
        results = inMemoryRestaurants;
      }
    } else {
      // In-Memory search & filter logic
      results = inMemoryRestaurants.filter(r => {
        let match = true;

        if (search) {
          const s = search.toLowerCase();
          const matchName = r.name.toLowerCase().includes(s);
          const matchCuisine = r.cuisines.some(c => c.toLowerCase().includes(s));
          const matchItem = r.menuCategories.some(cat =>
            cat.items.some(item => item.name.toLowerCase().includes(s) || (item.description && item.description.toLowerCase().includes(s)))
          );
          if (!matchName && !matchCuisine && !matchItem) match = false;
        }

        if (cuisine && cuisine !== 'all') {
          const matchCuisine = r.cuisines.some(c => c.toLowerCase().includes(cuisine.toLowerCase())) ||
            (r.primaryCuisine && r.primaryCuisine.toLowerCase() === cuisine.toLowerCase());
          if (!matchCuisine) match = false;
        }

        if (vegOnly === 'true' && !r.isVeg) {
          // If restaurant is pure veg or has veg items
          const hasVegItems = r.menuCategories.some(cat => cat.items.some(i => i.isVeg));
          if (!hasVegItems && !r.isVeg) match = false;
        }

        if (minRating && r.rating < parseFloat(minRating)) {
          match = false;
        }

        if (promoted === 'true' && !r.isPromoted) {
          match = false;
        }

        return match;
      });

      // Sorting
      if (sortBy === 'rating') {
        results.sort((a, b) => b.rating - a.rating);
      } else if (sortBy === 'deliveryTime') {
        results.sort((a, b) => a.deliveryTimeMinutes - b.deliveryTimeMinutes);
      } else if (sortBy === 'costLowToHigh') {
        results.sort((a, b) => a.priceForTwo - b.priceForTwo);
      } else if (sortBy === 'costHighToLow') {
        results.sort((a, b) => b.priceForTwo - a.priceForTwo);
      }
    }

    res.json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (error) {
    console.error('Fetch restaurants error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching restaurants' });
  }
};

// @route   GET /api/restaurants/:id
exports.getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;

    let restaurant;
    if (getDBStatus()) {
      restaurant = await Restaurant.findOne({ id }) || await Restaurant.findById(id).catch(() => null);
    }

    if (!restaurant) {
      restaurant = inMemoryRestaurants.find(r => r.id === id || r._id === id);
    }

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found'
      });
    }

    res.json({
      success: true,
      data: restaurant
    });
  } catch (error) {
    console.error('Fetch restaurant error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching restaurant' });
  }
};

// @route   GET /api/categories
exports.getCategories = (req, res) => {
  res.json({
    success: true,
    data: seedCategories
  });
};

// @route   GET /api/restaurants/suggestions
exports.getSearchSuggestions = async (req, res) => {
  try {
    const q = (req.query.q || req.query.search || '').trim().toLowerCase();
    
    let allRestaurants = [];
    if (getDBStatus()) {
      allRestaurants = await Restaurant.find({});
      if (!allRestaurants || allRestaurants.length === 0) {
        allRestaurants = inMemoryRestaurants;
      }
    } else {
      allRestaurants = inMemoryRestaurants;
    }

    if (!q) {
      // Return top trending suggestions
      const topDishes = [];
      allRestaurants.forEach(r => {
        r.menuCategories?.forEach(cat => {
          cat.items?.forEach(item => {
            if (topDishes.length < 6 && item.image) {
              topDishes.push({
                id: item.id || item._id,
                name: item.name,
                price: item.price,
                image: item.image,
                isVeg: item.isVeg,
                restaurantId: r.id,
                restaurantName: r.name,
                rating: item.rating || 4.2
              });
            }
          });
        });
      });

      return res.json({
        success: true,
        dishes: topDishes,
        restaurants: allRestaurants.slice(0, 4).map(r => ({
          id: r.id,
          name: r.name,
          image: r.image,
          cuisines: r.cuisines,
          rating: r.rating,
          deliveryTimeMinutes: r.deliveryTimeMinutes,
          area: r.location?.area || 'Bengaluru'
        })),
        cuisines: seedCategories.slice(0, 5).map(c => c.name)
      });
    }

    const matchedDishes = [];
    const matchedRestaurants = [];
    const matchedCuisinesSet = new Set();

    allRestaurants.forEach(r => {
      const restNameMatch = r.name.toLowerCase().includes(q);
      const cuisineMatch = r.cuisines?.some(c => c.toLowerCase().includes(q));

      if (restNameMatch || cuisineMatch) {
        if (matchedRestaurants.length < 6) {
          matchedRestaurants.push({
            id: r.id,
            name: r.name,
            image: r.image,
            cuisines: r.cuisines,
            rating: r.rating,
            deliveryTimeMinutes: r.deliveryTimeMinutes,
            area: r.location?.area || 'Bengaluru'
          });
        }
      }

      r.cuisines?.forEach(c => {
        if (c.toLowerCase().includes(q)) {
          matchedCuisinesSet.add(c);
        }
      });

      r.menuCategories?.forEach(cat => {
        cat.items?.forEach(item => {
          const itemNameMatch = item.name.toLowerCase().includes(q);
          const descMatch = item.description && item.description.toLowerCase().includes(q);
          const catMatch = cat.name && cat.name.toLowerCase().includes(q);

          if (itemNameMatch || descMatch || catMatch) {
            if (matchedDishes.length < 8) {
              matchedDishes.push({
                id: item.id || item._id,
                name: item.name,
                price: item.price,
                image: item.image,
                isVeg: item.isVeg,
                restaurantId: r.id,
                restaurantName: r.name,
                rating: item.rating || 4.2
              });
            }
          }
        });
      });
    });

    res.json({
      success: true,
      dishes: matchedDishes,
      restaurants: matchedRestaurants,
      cuisines: Array.from(matchedCuisinesSet).slice(0, 4)
    });
  } catch (error) {
    console.error('Search suggestions error:', error);
    res.status(500).json({ success: false, message: 'Error fetching suggestions' });
  }
};
