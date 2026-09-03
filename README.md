# 🍕 Swiggy Clone – MERN Stack Food Delivery Web App

A high-performance, responsive, and feature-complete food delivery web application inspired by Swiggy, built using the MERN Stack (MongoDB, Express.js, Node.js, React.js), JWT authentication, Tailwind CSS, Lucide Icons, and Framer Motion.

---

## 🌟 Key Features

### 🛒 Frontend (React.js + Vite + Tailwind CSS)
- **Home Page**:
  - Hero promotional carousel banner with interactive discount codes.
  - Horizontal cuisine category chips (*Biryani, Pizzas, Burgers, North Indian, Chinese, Momos, Desserts*).
  - Quick filter toolbar (*Fast Delivery < 25m, Ratings 4.0+, Pure Veg, Price Filters, Relevance Sort*).
  - Restaurant card grid with discount badges, delivery times, and favorite toggle.
  - Live search bar with instant filter updates.
  - Skeleton shimmer loaders for seamless UX.
- **Restaurant Menu Page**:
  - Detailed restaurant header (ratings, delivery ETA, distance, address).
  - Veg-only menu toggle switch and in-menu search bar.
  - Category accordions (*Recommended Bestsellers, Starters, Main Course, Desserts*).
  - Menu dish cards with Veg / Non-veg indicators, prices, ratings, and **ADD** button with stepper (`- 1 +`).
  - Floating cart banner on mobile.
- **Cart & Checkout**:
  - Smooth slide-in Cart Drawer from the right side.
  - Multiple restaurant conflict warning modal (Swiggy behavior).
  - Interactive Coupon code apply box (`SWIGGY50`, `FEAST100`, `WELCOME20`, `TASTY30`).
  - Delivery partner tip selector.
  - Bill breakdown with automatic free delivery computation (orders > ₹500).
  - Full Checkout page with Saved Address selection, Add New Address form, and Payment method selection (UPI, Credit/Debit Card, Net Banking, COD).
- **Live Order Tracking**:
  - Live animated delivery progress bar (*Order Confirmed ➔ Cooking in Kitchen ➔ Out for Delivery ➔ Delivered*).
  - Real-time ETA countdown timer.
  - Delivery partner contact card with direct call trigger.
  - Visual dark-mode delivery map with animated rider.
  - Celebratory confetti on order placement!
- **Authentication & Profile**:
  - Animated popup Auth Modal with Login & Sign Up tabs.
  - **⚡ One-Click Demo Login** button for instant testing.
  - User profile with order history, address book, and saved favorite spots.
  - 1-Click "Reorder" button.

### ⚙️ Backend (Node.js + Express + MongoDB & In-Memory Fallback)
- **JWT Authentication** (`/api/auth/register`, `/api/auth/login`, `/api/auth/me`).
- **Restaurant API** (`/api/restaurants`, `/api/restaurants/:id`, `/api/restaurants/categories`) with search, cuisine filter, rating filter, and sorting.
- **Order Management API** (`/api/orders`, `/api/orders/:orderId`) with dynamic order simulation.
- **Zero Friction**: Connects to MongoDB if available; seamlessly falls back to high-speed in-memory store if MongoDB is not running locally.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
# Install root, server, and client dependencies
npm run install:all
```

### 2. Start Development Servers (Concurrent)
```bash
npm run dev
```
- **Frontend App**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`

---

## 🔑 Demo Account Credentials
- **Email**: `demo@swiggy.com`
- **Password**: `swiggy123`
*(Or simply click the **"⚡ One-Click Instant Demo Login"** button on the Sign In modal!)*

---

## 🎟️ Available Discount Coupons
- `SWIGGY50`: 50% OFF up to ₹100
- `FEAST100`: Flat ₹100 OFF on orders above ₹399
- `WELCOME20`: 20% OFF up to ₹50
- `TASTY30`: 30% OFF up to ₹80
