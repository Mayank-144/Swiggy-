const { mockOrders } = require('./restaurantsData');

// Unified in-memory orders store shared across all controllers
let sharedOrders = [...(mockOrders || [])];

const getSharedOrders = () => sharedOrders;

const addSharedOrder = (order) => {
  // Add to top of list
  sharedOrders.unshift(order);
  return order;
};

const findSharedOrderById = (orderId) => {
  return sharedOrders.find((o) => o.orderId === orderId || o._id === orderId);
};

const findSharedOrdersByUser = (userId, userEmail) => {
  const filtered = sharedOrders.filter(
    (o) => o.userId === userId || o.userEmail === userEmail || userId === 'usr-demo-01'
  );
  return filtered.length > 0 ? filtered : sharedOrders;
};

module.exports = {
  sharedOrders,
  getSharedOrders,
  addSharedOrder,
  findSharedOrderById,
  findSharedOrdersByUser
};
