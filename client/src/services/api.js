import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor for attaching Bearer token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('swiggy_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for unified handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

// API methods
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getMe: () => api.get('/auth/me'),
  updateProfile: (profileData) => api.put('/auth/profile', profileData),
  addAddress: (addressData) => api.post('/auth/address', addressData),
  toggleFavorite: (restaurantId) => api.post(`/auth/favorites/${restaurantId}`)
};

export const restaurantAPI = {
  getRestaurants: (params) => api.get('/restaurants', { params }),
  getRestaurantById: (id) => api.get(`/restaurants/${id}`),
  getCategories: () => api.get('/restaurants/categories')
};

export const orderAPI = {
  createOrder: (orderData) => api.post('/orders', orderData),
  getUserOrders: () => api.get('/orders'),
  getOrderById: (orderId) => api.get(`/orders/${orderId}`)
};

export default api;
