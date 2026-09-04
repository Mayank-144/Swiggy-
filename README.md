<p align="center">
  <img src="https://cdn.worldvectorlogo.com/logos/swiggy-1.svg" alt="Swiggy Official Logo" width="220" />
</p>

<h1 align="center">Swiggy Clone — MERN Stack Food Delivery Platform</h1>

<p align="center">
  A pixel-perfect, high-performance food ordering and delivery web application inspired by <strong>Swiggy</strong>, built using the <strong>MERN Stack</strong> (MongoDB, Express.js, React.js, Node.js), Tailwind CSS, Razorpay Payment Gateway, and Framer Motion.
</p>

<p align="center">
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-18.x-61DAFB?style=flat&logo=react&logoColor=black" alt="React" /></a>
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js&logoColor=white" alt="Node.js" /></a>
  <a href="https://expressjs.com/"><img src="https://img.shields.io/badge/Express.js-4.x-000000?style=flat&logo=express&logoColor=white" alt="Express" /></a>
  <a href="https://www.mongodb.com/"><img src="https://img.shields.io/badge/MongoDB-Atlas%20%2F%20Mongoose-47A248?style=flat&logo=mongodb&logoColor=white" alt="MongoDB" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=flat&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
  <a href="https://razorpay.com/"><img src="https://img.shields.io/badge/Razorpay-Payment%20Gateway-0C2340?style=flat&logo=razorpay&logoColor=blue" alt="Razorpay" /></a>
  <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-5.x-646CFF?style=flat&logo=vite&logoColor=white" alt="Vite" /></a>
</p>

---

## 🌟 Key Highlights & Features

### 🖥️ 1. Pixel-Perfect Swiggy UI & Design
- **Desktop Experience**:
  - Sticky clean White Navbar with Location dropdown, Live Search, Swiggy Corporate, Partner With Us, and Account pill buttons.
  - Full-width Orange Hero Banner (`#FC8019`) with food/grocery selection and location search pill.
  - Interactive "What's on your mind?" circular cuisine chips with horizontal scrolling.
  - Top Restaurant Chains section with rating badges, delivery time, distance, discount offers, and favorite bookmarking.
  - Instamart Grocery Banner & Dineout Dining Card sections.
  - Best Places to Eat, Best Cuisines Near Me & Explore Every Restaurant Near Me interactive chips.
  - App Download Banner & Official 5-column Footer with City selector.
- **Mobile Experience (375px+ Responsive)**:
  - Seamless Orange Navbar blending into Hero banner.
  - Responsive Mobile Hamburger menu with profile, orders, addresses, and navigation links.
  - No horizontal page overflow; touch-friendly swipeable carousels.

### 💳 2. Payment Gateway & Checkout
- **Official Razorpay Integration**:
  - Direct 256-bit encrypted checkout popup supporting **UPI (Google Pay, PhonePe, Paytm), Cards, NetBanking & Wallets**.
  - Backend HMAC-SHA256 signature verification for fraud-proof transaction security.
- **Cash on Delivery (COD) Flow**:
  - Realistic COD ordering: Payment is marked as `PENDING (Pay on Delivery)` until the delivery partner marks the order as `DELIVERED`.
  - Clear Doorstep amount alerts: *"Keep ₹... ready in cash or UPI QR for valet on delivery"*.
- **Coupon Discount Engine**:
  - Instant coupon validation (`SWIGGY50`, `FEAST100`, `WELCOME20`, `TASTY30`).
  - Automatic dynamic Delivery Fee waiver on orders above ₹500.

### 🛵 3. Live Order Tracking & Simulation
- Real-time animated 4-stage delivery timeline (*Order Confirmed ➔ Preparing Food ➔ Out for Delivery ➔ Order Delivered*).
- Live ETA countdown timer.
- Moving valet scooter on dark-mode stylized map route.
- Delivery Partner contact card with direct phone dialer trigger.
- Full bill receipt with itemized breakdown and payment status badges.

### 🔒 4. Authentication & User Profile
- JWT-based authentication with bcrypt password hashing.
- **⚡ One-Click Instant Demo Login** for quick testing.
- Profile dashboard with tabs for:
  - **Past Orders**: Live tracking link, order details, and **1-Click Reorder** button.
  - **Saved Addresses**: Manage multiple home/work addresses.
  - **Favorites**: Bookmarked restaurants for quick ordering.

### ⚡ 5. Resilient Dual-Data Architecture
- Connects automatically to **MongoDB Atlas / Local MongoDB**.
- **Shared In-Memory Fallback**: Seamless high-speed fallback store so the application runs with 100% functionality even in offline / demo environments without database downtime.

---

## 🏗️ Project Architecture

```
swiggy-clone/
├── client/                     # Frontend (React + Vite + Tailwind CSS)
│   ├── src/
│   │   ├── components/         # Reusable UI (Navbar, Hero, RestaurantCard, CartDrawer, etc.)
│   │   ├── context/            # Global State (AuthContext, CartContext, ToastContext)
│   │   ├── pages/              # Views (HomePage, RestaurantPage, CheckoutPage, OrderTrackingPage, ProfilePage)
│   │   ├── services/           # Axios API services (auth, restaurant, order, payment)
│   │   ├── index.css           # Custom utility styles, shimmer animations, badges
│   │   └── App.jsx             # React Router routing setup
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Backend API (Node.js + Express.js + MongoDB)
│   ├── config/                 # Database configuration (MongoDB / In-memory)
│   ├── controllers/            # Controller logic (auth, restaurant, order, payment)
│   ├── data/                   # Seed data & shared unified order store
│   ├── models/                 # Mongoose schemas (User, Restaurant, Order)
│   ├── routes/                 # Express API routes (/auth, /restaurants, /orders, /payment)
│   ├── .env                    # Environment variables (PORT, JWT_SECRET, RAZORPAY keys)
│   ├── package.json
│   └── server.js               # Entry point & production static file server
│
└── package.json                # Root package with unified build and start scripts
```

---

## 🛠️ Environment Variables Configuration

Create a `.env` file inside the `server/` directory:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/swiggy_clone
JWT_SECRET=swiggy_super_secret_jwt_key_2026
NODE_ENV=development
RAZORPAY_KEY_ID=rzp_test_TXul5hpjc66JQg
RAZORPAY_KEY_SECRET=TeqdTJ43vSkVX2LDUkCVXqZN
```

*(Note: For production, replace `MONGODB_URI` with your cloud MongoDB Atlas connection string).*

---

## 🚀 Quick Start (Local Setup)

### 1. Clone the repository
```bash
git clone https://github.com/Mayank-144/Swiggy-.git
cd Swiggy-
```

### 2. Install all dependencies
```bash
npm install
npm --prefix server install
npm --prefix client install
```

### 3. Start development servers
In root directory:
```bash
# Start backend server (Port 5000)
npm --prefix server start

# Start frontend dev server (Port 5173)
npm --prefix client run dev
```

- **Frontend Application**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`

---

## 🌐 Deploying to Render.com

This repository is pre-configured with a unified root build script:

1. Create a new **Web Service** on [Render.com](https://render.com) and link your GitHub repository.
2. Set configuration:
   - **Environment**: `Node`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
3. Add **Environment Variables** in the Render Dashboard:
   | Key | Value |
   | :--- | :--- |
   | `NODE_ENV` | `production` |
   | `JWT_SECRET` | `swiggy_super_secret_jwt_key_2026` |
   | `RAZORPAY_KEY_ID` | `rzp_test_TXul5hpjc66JQg` |
   | `RAZORPAY_KEY_SECRET` | `TeqdTJ43vSkVX2LDUkCVXqZN` |
   | `MONGODB_URI` | `mongodb+srv://<username>:<password>@cluster0.mongodb.net/swiggy_clone?retryWrites=true&w=majority` |
4. Click **Deploy Web Service** 🚀

---

## 🔑 Demo Account & Coupons

### Demo Credentials
- **Email**: `demo@swiggy.com`
- **Password**: `swiggy123`
*(Or click **"⚡ One-Click Instant Demo Login"** on the Sign-In modal)*

### Available Coupons
| Coupon Code | Discount Offer |
| :--- | :--- |
| `SWIGGY50` | 50% OFF up to ₹100 |
| `FEAST100` | Flat ₹100 OFF on orders above ₹399 |
| `WELCOME20` | 20% OFF up to ₹50 |
| `TASTY30` | 30% OFF up to ₹80 |

---

## 📡 API Reference Overview

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register new user account | Public |
| `POST` | `/api/auth/login` | Login user & return JWT token | Public |
| `GET` | `/api/auth/me` | Fetch authenticated user details | Private |
| `GET` | `/api/restaurants` | List all restaurants with search & filters | Public |
| `GET` | `/api/restaurants/:id` | Get single restaurant with full menu | Public |
| `POST` | `/api/payment/create-order` | Create Razorpay order | Private |
| `POST` | `/api/payment/verify` | Verify HMAC signature & save order | Private |
| `POST` | `/api/orders` | Place Cash on Delivery order | Private |
| `GET` | `/api/orders` | Fetch user past orders | Private |
| `GET` | `/api/orders/:orderId` | Get live tracking status of order | Public / Private |
| `GET` | `/api/health` | API server health check | Public |

---

## 📄 License
This project is open-source and created for educational and portfolio purposes.
