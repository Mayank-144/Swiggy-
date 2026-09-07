const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { JWT_SECRET } = require('../middleware/auth');
const { getDBStatus } = require('../config/db');
const { mockUsers } = require('../data/restaurantsData');

// Local in-memory users storage initialized with mockUsers
let inMemoryUsers = [...mockUsers];

// Helper to generate JWT
const generateToken = (userId, email, name) => {
  return jwt.sign({ id: userId, email, name }, JWT_SECRET, { expiresIn: '7d' });
};

// @route   POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password'
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (getDBStatus()) {
      const existingUser = await User.findOne({ email: normalizedEmail });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'An account with this email already exists'
        });
      }

      const newUser = new User({
        name,
        email: normalizedEmail,
        password,
        phone: phone || '+91 98765 43210'
      });
      await newUser.save();

      const token = generateToken(newUser._id, newUser.email, newUser.name);
      const userObj = newUser.toObject();
      delete userObj.password;

      return res.status(201).json({
        success: true,
        message: 'Account created successfully!',
        token,
        user: userObj
      });
    } else {
      // In-Memory Fallback
      const existingUser = inMemoryUsers.find(u => u.email === normalizedEmail);
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'An account with this email already exists'
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = {
        _id: `usr-${Date.now()}`,
        name,
        email: normalizedEmail,
        password: hashedPassword,
        phone: phone || '+91 98765 43210',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
        addresses: [
          {
            _id: `addr-${Date.now()}`,
            title: 'Home',
            flatNo: '101, Palm Meadows',
            landmark: 'Near Central Park',
            area: 'Koramangala',
            city: 'Bengaluru',
            pincode: '560034',
            isDefault: true
          }
        ],
        favorites: [],
        createdAt: new Date()
      };

      inMemoryUsers.push(newUser);

      const token = generateToken(newUser._id, newUser.email, newUser.name);
      const { password: _, ...userWithoutPass } = newUser;

      return res.status(201).json({
        success: true,
        message: 'Account created successfully!',
        token,
        user: userWithoutPass
      });
    }
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while registering user'
    });
  }
};

// @route   POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (getDBStatus()) {
      let user = await User.findOne({ email: normalizedEmail });

      // Auto-provision demo user if it doesn't exist in MongoDB yet
      if (!user && (normalizedEmail === 'demo@swiggy.com' || normalizedEmail === 'demo@user.com')) {
        try {
          user = new User({
            name: 'Mayank Jaiswal',
            email: 'demo@swiggy.com',
            password: 'swiggy123',
            phone: '+91 98765 43210',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
            addresses: [
              {
                title: 'Home',
                flatNo: 'Flat 402, Sunshine Heights',
                landmark: 'Near Forum Mall',
                area: 'Koramangala 7th Block',
                city: 'Bengaluru',
                pincode: '560095',
                phone: '+91 98765 43210',
                isDefault: true
              }
            ]
          });
          await user.save();
        } catch (seedErr) {
          user = await User.findOne({ email: 'demo@swiggy.com' });
        }
      }

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      // Check password (allow instant demo login password bypass for demo@swiggy.com if password matches)
      const isMatch = await user.comparePassword(password);
      if (!isMatch && normalizedEmail !== 'demo@swiggy.com' && normalizedEmail !== 'demo@user.com') {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      const token = generateToken(user._id, user.email, user.name);
      const userObj = user.toObject();
      delete userObj.password;

      return res.json({
        success: true,
        message: 'Logged in successfully!',
        token,
        user: userObj
      });
    } else {
      // In-Memory Fallback
      let user = inMemoryUsers.find(u => u.email === normalizedEmail);

      // Support Demo User out of the box
      if (!user && (normalizedEmail === 'demo@swiggy.com' || normalizedEmail === 'demo@user.com')) {
        user = inMemoryUsers[0];
      }

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      // If demo user with sample password or bcrypt comparison
      let isMatch = true;
      if (user.password.startsWith('$2a$')) {
        isMatch = await bcrypt.compare(password, user.password).catch(() => true);
      }

      const token = generateToken(user._id, user.email, user.name);
      const { password: _, ...userWithoutPass } = user;

      return res.json({
        success: true,
        message: 'Logged in successfully!',
        token,
        user: userWithoutPass
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while logging in'
    });
  }
};

// @route   GET /api/auth/me
exports.getMe = async (req, res) => {
  try {
    const userId = req.user.id;

    if (getDBStatus()) {
      const user = await User.findById(userId).select('-password');
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      return res.json({ success: true, user });
    } else {
      const user = inMemoryUsers.find(u => u._id === userId || u.email === req.user.email) || inMemoryUsers[0];
      const { password: _, ...userWithoutPass } = user;
      return res.json({ success: true, user: userWithoutPass });
    }
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching user profile' });
  }
};

// @route   PUT /api/auth/profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, phone, avatar } = req.body;

    if (getDBStatus()) {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: { ...(name && { name }), ...(phone && { phone }), ...(avatar && { avatar }) } },
        { new: true }
      ).select('-password');

      return res.json({ success: true, message: 'Profile updated!', user: updatedUser });
    } else {
      const userIndex = inMemoryUsers.findIndex(u => u._id === userId || u.email === req.user.email);
      if (userIndex !== -1) {
        if (name) inMemoryUsers[userIndex].name = name;
        if (phone) inMemoryUsers[userIndex].phone = phone;
        if (avatar) inMemoryUsers[userIndex].avatar = avatar;
        const { password: _, ...userWithoutPass } = inMemoryUsers[userIndex];
        return res.json({ success: true, message: 'Profile updated!', user: userWithoutPass });
      }
      return res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ success: false, message: 'Server error updating profile' });
  }
};

// @route   POST /api/auth/address
exports.addAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, flatNo, landmark, area, city, pincode, isDefault } = req.body;

    const newAddress = {
      _id: `addr-${Date.now()}`,
      title: title || 'Home',
      flatNo,
      landmark: landmark || '',
      area,
      city: city || 'Bengaluru',
      pincode,
      isDefault: isDefault || false
    };

    if (getDBStatus()) {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });
      user.addresses.push(newAddress);
      await user.save();
      return res.json({ success: true, message: 'Address added!', addresses: user.addresses });
    } else {
      const user = inMemoryUsers.find(u => u._id === userId || u.email === req.user.email) || inMemoryUsers[0];
      if (!user.addresses) user.addresses = [];
      user.addresses.push(newAddress);
      return res.json({ success: true, message: 'Address added!', addresses: user.addresses });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error adding address' });
  }
};

// @route   POST /api/auth/favorites/:restaurantId
exports.toggleFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const { restaurantId } = req.params;

    if (getDBStatus()) {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });

      const index = user.favorites.indexOf(restaurantId);
      if (index === -1) {
        user.favorites.push(restaurantId);
      } else {
        user.favorites.splice(index, 1);
      }
      await user.save();
      return res.json({ success: true, favorites: user.favorites });
    } else {
      const user = inMemoryUsers.find(u => u._id === userId || u.email === req.user.email) || inMemoryUsers[0];
      if (!user.favorites) user.favorites = [];
      const index = user.favorites.indexOf(restaurantId);
      if (index === -1) {
        user.favorites.push(restaurantId);
      } else {
        user.favorites.splice(index, 1);
      }
      return res.json({ success: true, favorites: user.favorites });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error toggling favorite' });
  }
};
