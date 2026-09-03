import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';
import LocationModal from './components/LocationModal';

import HomePage from './pages/HomePage';
import RestaurantPage from './pages/RestaurantPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import ProfilePage from './pages/ProfilePage';

export function AppContent() {
  const [globalSearch, setGlobalSearch] = useState('');
  const location = useLocation();

  const isLandingHome = location.pathname === '/' && !globalSearch;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFC]">
      {/* Sticky White Navbar for inner pages or active search */}
      {!isLandingHome && <Navbar onSearch={setGlobalSearch} searchQuery={globalSearch} />}

      {/* Main Pages */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage globalSearch={globalSearch} />} />
          <Route path="/restaurant/:id" element={<RestaurantPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-tracking/:orderId" element={<OrderTrackingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>

      {/* Modals & Slide-in Drawers */}
      <CartDrawer />
      <AuthModal />
      <LocationModal />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

export function App() {
  return (
    <Router>
      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </Router>
  );
}

export default App;
