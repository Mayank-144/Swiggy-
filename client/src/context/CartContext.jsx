import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext();

const COUPONS = {
  'SWIGGY50': { discountPercent: 50, maxDiscount: 100, minOrder: 199, description: '50% OFF up to ₹100' },
  'WELCOME20': { discountPercent: 20, maxDiscount: 50, minOrder: 149, description: '20% OFF up to ₹50' },
  'TASTY30': { discountPercent: 30, maxDiscount: 80, minOrder: 249, description: '30% OFF up to ₹80' },
  'FEAST100': { flatDiscount: 100, minOrder: 399, description: 'Flat ₹100 OFF on orders above ₹399' }
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('swiggy_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [restaurant, setRestaurant] = useState(() => {
    const saved = localStorage.getItem('swiggy_cart_restaurant');
    return saved ? JSON.parse(saved) : null;
  });

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [conflictModal, setConflictModal] = useState({ isOpen: false, pendingItem: null, pendingRestaurant: null });
  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    return localStorage.getItem('swiggy_coupon') || '';
  });
  const [tip, setTip] = useState(0);

  const { addToast } = useToast();

  useEffect(() => {
    localStorage.setItem('swiggy_cart', JSON.stringify(cartItems));
    if (cartItems.length === 0) {
      setRestaurant(null);
      localStorage.removeItem('swiggy_cart_restaurant');
    }
  }, [cartItems]);

  useEffect(() => {
    if (restaurant) {
      localStorage.setItem('swiggy_cart_restaurant', JSON.stringify(restaurant));
    }
  }, [restaurant]);

  // Check and Add item to cart
  const addToCart = (item, restInfo) => {
    if (cartItems.length > 0 && restaurant && restaurant.id !== restInfo.id) {
      // Restaurant conflict!
      setConflictModal({
        isOpen: true,
        pendingItem: item,
        pendingRestaurant: restInfo
      });
      return;
    }

    if (!restaurant) {
      setRestaurant({
        id: restInfo.id,
        name: restInfo.name,
        image: restInfo.image,
        area: restInfo.location?.area || restInfo.area || 'Bengaluru'
      });
    }

    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1 }];
    });

    addToast(`Added "${item.name}" to cart 🛒`, 'success', 2500);
  };

  const resolveConflict = (proceed) => {
    if (proceed && conflictModal.pendingItem && conflictModal.pendingRestaurant) {
      const { pendingItem, pendingRestaurant } = conflictModal;
      setRestaurant({
        id: pendingRestaurant.id,
        name: pendingRestaurant.name,
        image: pendingRestaurant.image,
        area: pendingRestaurant.location?.area || pendingRestaurant.area || 'Bengaluru'
      });
      setCartItems([{ ...pendingItem, quantity: 1 }]);
      addToast(`Cart replaced with items from ${pendingRestaurant.name}`, 'info');
    }
    setConflictModal({ isOpen: false, pendingItem: null, pendingRestaurant: null });
  };

  const updateQuantity = (itemId, delta) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => prev.filter((i) => i.id !== itemId));
    addToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCartItems([]);
    setRestaurant(null);
    setAppliedCoupon('');
    setTip(0);
    localStorage.removeItem('swiggy_cart');
    localStorage.removeItem('swiggy_cart_restaurant');
    localStorage.removeItem('swiggy_coupon');
  };

  const applyCoupon = (code) => {
    const couponCode = code.toUpperCase().trim();
    const coupon = COUPONS[couponCode];

    if (!coupon) {
      addToast('Invalid coupon code. Try SWIGGY50 or FEAST100', 'error');
      return false;
    }

    if (itemTotal < coupon.minOrder) {
      addToast(`Minimum order of ₹${coupon.minOrder} required for ${couponCode}`, 'error');
      return false;
    }

    setAppliedCoupon(couponCode);
    localStorage.setItem('swiggy_coupon', couponCode);
    addToast(`Coupon "${couponCode}" applied successfully! 🎉`, 'success');
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon('');
    localStorage.removeItem('swiggy_coupon');
    addToast('Coupon removed', 'info');
  };

  // Bill computations
  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const itemTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Delivery fee is free over ₹500
  const deliveryFee = itemTotal > 500 || itemTotal === 0 ? 0 : 35;
  const platformFee = itemTotal > 0 ? 5 : 0;
  const taxes = Math.round(itemTotal * 0.05); // 5% GST

  let discount = 0;
  if (appliedCoupon && COUPONS[appliedCoupon]) {
    const cp = COUPONS[appliedCoupon];
    if (cp.flatDiscount) {
      discount = cp.flatDiscount;
    } else if (cp.discountPercent) {
      discount = Math.min(Math.round((itemTotal * cp.discountPercent) / 100), cp.maxDiscount);
    }
  }

  const grandTotal = Math.max(0, itemTotal + deliveryFee + platformFee + taxes + tip - discount);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        restaurant,
        totalItemsCount,
        itemTotal,
        deliveryFee,
        platformFee,
        taxes,
        tip,
        setTip,
        discount,
        grandTotal,
        appliedCoupon,
        availableCoupons: COUPONS,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        openCartDrawer: () => setIsCartDrawerOpen(true),
        closeCartDrawer: () => setIsCartDrawerOpen(false),
        conflictModal,
        resolveConflict
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
