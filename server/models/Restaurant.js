const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  isVeg: { type: Boolean, default: true },
  isBestseller: { type: Boolean, default: false },
  rating: { type: Number, default: 4.2 },
  ratingCount: { type: Number, default: 120 },
  image: { type: String },
  isCustomisable: { type: Boolean, default: false },
  category: { type: String, default: 'Recommended' }
});

const menuCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  items: [menuItemSchema]
});

const restaurantSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  cuisines: [{ type: String }],
  primaryCuisine: { type: String },
  rating: { type: Number, default: 4.2 },
  totalRatingsString: { type: String, default: '1K+ ratings' },
  deliveryTime: { type: String, default: '25-30 mins' },
  deliveryTimeMinutes: { type: Number, default: 28 },
  distance: { type: String, default: '2.5 km' },
  priceForTwo: { type: Number, default: 350 },
  costForTwoMessage: { type: String, default: '₹350 for two' },
  discount: { type: String, default: '50% OFF UPTO ₹100' },
  discountCode: { type: String, default: 'WELCOME50' },
  isVeg: { type: Boolean, default: false },
  isPromoted: { type: Boolean, default: false },
  isBestseller: { type: Boolean, default: false },
  location: {
    area: { type: String, default: 'Koramangala' },
    city: { type: String, default: 'Bengaluru' },
    address: { type: String, default: '100 Feet Rd, 4th Block, Koramangala' }
  },
  menuCategories: [menuCategorySchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
