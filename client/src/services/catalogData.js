// Comprehensive Catalog Data for Instant Client-side Search & Suggestions

export const popularCuisines = [
  'Biryani', 'Pizza', 'Burger', 'Chinese', 'North Indian', 'South Indian', 
  'Rolls', 'Thali', 'Ice Cream', 'Cake', 'Momos', 'Pasta', 'Shawarma', 'Dosa'
];

export const seedCatalogRestaurants = [
  {
    id: "rst-1",
    name: "Biryani By Kilo",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80",
    cuisines: ["Biryani", "Hyderabadi", "North Indian", "Mughlai", "Kebabs"],
    rating: 4.4,
    deliveryTimeMinutes: 32,
    area: "Koramangala 5th Block",
    priceForTwo: 500,
    dishes: [
      {
        id: "bbk-101",
        name: "Hyderabadi Chicken Dum Biryani [1/2 Kg]",
        price: 395,
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=80",
        isVeg: false,
        rating: 4.6
      },
      {
        id: "bbk-102",
        name: "Lucknowi Mutton Biryani [1/2 Kg]",
        price: 525,
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&auto=format&fit=crop&q=80",
        isVeg: false,
        rating: 4.5
      },
      {
        id: "bbk-103",
        name: "Paneer Dum Biryani [1/2 Kg]",
        price: 335,
        image: "https://images.unsplash.com/photo-1642821373181-696a54913e93?w=500&auto=format&fit=crop&q=80",
        isVeg: true,
        rating: 4.3
      },
      {
        id: "bbk-201",
        name: "Galouti Kebab [4 Pcs]",
        price: 380,
        image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=500&auto=format&fit=crop&q=80",
        isVeg: false,
        rating: 4.7
      },
      {
        id: "bbk-301",
        name: "Matka Phirni",
        price: 135,
        image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=500&auto=format&fit=crop&q=80",
        isVeg: true,
        rating: 4.8
      }
    ]
  },
  {
    id: "rst-2",
    name: "Domino's Pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80",
    cuisines: ["Pizzas", "Italian", "Fast Food", "Desserts"],
    rating: 4.3,
    deliveryTimeMinutes: 22,
    area: "Indiranagar",
    priceForTwo: 400,
    dishes: [
      {
        id: "dom-101",
        name: "Farmhouse Deluxe Veg Pizza",
        price: 299,
        image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&auto=format&fit=crop&q=80",
        isVeg: true,
        rating: 4.5
      },
      {
        id: "dom-102",
        name: "Chicken Dominator Pizza",
        price: 399,
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&auto=format&fit=crop&q=80",
        isVeg: false,
        rating: 4.6
      },
      {
        id: "dom-103",
        name: "Peppy Paneer Pizza",
        price: 289,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&auto=format&fit=crop&q=80",
        isVeg: true,
        rating: 4.4
      },
      {
        id: "dom-201",
        name: "Stuffed Garlic Breadsticks",
        price: 159,
        image: "https://images.unsplash.com/photo-1619860860774-1e2e17343432?w=500&auto=format&fit=crop&q=80",
        isVeg: true,
        rating: 4.7
      },
      {
        id: "dom-202",
        name: "Choco Lava Cake",
        price: 109,
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&auto=format&fit=crop&q=80",
        isVeg: true,
        rating: 4.9
      }
    ]
  },
  {
    id: "rst-3",
    name: "Burger King",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&auto=format&fit=crop&q=80",
    cuisines: ["Burgers", "American", "Fast Food", "Beverages"],
    rating: 4.2,
    deliveryTimeMinutes: 25,
    area: "HSR Layout Sector 3",
    priceForTwo: 350,
    dishes: [
      {
        id: "bk-101",
        name: "Crispy Veg Double Patty Burger",
        price: 129,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80",
        isVeg: true,
        rating: 4.3
      },
      {
        id: "bk-102",
        name: "Chicken Whopper Burger",
        price: 219,
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&auto=format&fit=crop&q=80",
        isVeg: false,
        rating: 4.6
      },
      {
        id: "bk-201",
        name: "King Peri Peri Fries",
        price: 119,
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&auto=format&fit=crop&q=80",
        isVeg: true,
        rating: 4.4
      }
    ]
  },
  {
    id: "rst-4",
    name: "Subway",
    image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=800&auto=format&fit=crop&q=80",
    cuisines: ["Sandwiches", "Healthy Food", "Salads", "Wraps"],
    rating: 4.1,
    deliveryTimeMinutes: 28,
    area: "Koramangala 4th Block",
    priceForTwo: 350,
    dishes: [
      {
        id: "sub-101",
        name: "Paneer Tikka Signature Sub [15 cm]",
        price: 229,
        image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=500&auto=format&fit=crop&q=80",
        isVeg: true,
        rating: 4.3
      },
      {
        id: "sub-102",
        name: "Roasted Chicken Strip Sub [15 cm]",
        price: 249,
        image: "https://images.unsplash.com/photo-1554433607-66b5efe9d304?w=500&auto=format&fit=crop&q=80",
        isVeg: false,
        rating: 4.4
      },
      {
        id: "sub-201",
        name: "Double Chocolate Chip Cookie",
        price: 59,
        image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&auto=format&fit=crop&q=80",
        isVeg: true,
        rating: 4.7
      }
    ]
  },
  {
    id: "rst-5",
    name: "Haldiram's Sweets & Restaurant",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&auto=format&fit=crop&q=80",
    cuisines: ["North Indian", "Sweets", "Chaat", "Thali", "Snacks"],
    rating: 4.5,
    deliveryTimeMinutes: 30,
    area: "JP Nagar 6th Phase",
    priceForTwo: 450,
    dishes: [
      {
        id: "hld-101",
        name: "Special Deluxe North Indian Thali",
        price: 299,
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=80",
        isVeg: true,
        rating: 4.7
      },
      {
        id: "hld-102",
        name: "Raj Kachori Chaat Royale",
        price: 139,
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=80",
        isVeg: true,
        rating: 4.8
      },
      {
        id: "hld-201",
        name: "Kaju Katli [250g Box]",
        price: 275,
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=80",
        isVeg: true,
        rating: 4.9
      }
    ]
  },
  {
    id: "rst-6",
    name: "Pizza Hut",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&auto=format&fit=crop&q=80",
    cuisines: ["Pizzas", "Italian", "Pastas", "Desserts"],
    rating: 4.2,
    deliveryTimeMinutes: 30,
    area: "BTM Layout 2nd Stage",
    priceForTwo: 450,
    dishes: [
      {
        id: "ph-101",
        name: "Cheese Maxx Veggie Feast Pizza",
        price: 349,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&auto=format&fit=crop&q=80",
        isVeg: true,
        rating: 4.5
      },
      {
        id: "ph-102",
        name: "Spiced Chicken Supreme Pizza",
        price: 429,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=80",
        isVeg: false,
        rating: 4.6
      },
      {
        id: "ph-201",
        name: "Creamy Cheesy Pasta Italiano",
        price: 219,
        image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=500&auto=format&fit=crop&q=80",
        isVeg: true,
        rating: 4.3
      }
    ]
  },
  {
    id: "rst-7",
    name: "KFC - Kentucky Fried Chicken",
    image: "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?w=800&auto=format&fit=crop&q=80",
    cuisines: ["Fried Chicken", "Fast Food", "Burgers", "Rolls"],
    rating: 4.3,
    deliveryTimeMinutes: 24,
    area: "Whitefield Main Road",
    priceForTwo: 450,
    dishes: [
      {
        id: "kfc-101",
        name: "Hot & Crispy Chicken Bucket [6 Pcs]",
        price: 449,
        image: "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?w=500&auto=format&fit=crop&q=80",
        isVeg: false,
        rating: 4.7
      },
      {
        id: "kfc-102",
        name: "Zinger Burger with Cheese",
        price: 199,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80",
        isVeg: false,
        rating: 4.5
      },
      {
        id: "kfc-201",
        name: "Popcorn Chicken [Large]",
        price: 249,
        image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=500&auto=format&fit=crop&q=80",
        isVeg: false,
        rating: 4.6
      }
    ]
  },
  {
    id: "rst-8",
    name: "Baskin Robbins",
    image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=800&auto=format&fit=crop&q=80",
    cuisines: ["Ice Cream", "Desserts", "Shakes"],
    rating: 4.6,
    deliveryTimeMinutes: 18,
    area: "Indiranagar 100ft Road",
    priceForTwo: 300,
    dishes: [
      {
        id: "br-101",
        name: "Mississippi Mud Premium Tub [450ml]",
        price: 340,
        image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=500&auto=format&fit=crop&q=80",
        isVeg: true,
        rating: 4.8
      },
      {
        id: "br-102",
        name: "Cotton Candy Cone Double Scoop",
        price: 180,
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&auto=format&fit=crop&q=80",
        isVeg: true,
        rating: 4.6
      }
    ]
  }
];

/**
 * Fast in-memory search function that returns instantaneous suggestions
 * @param {string} rawQuery 
 * @returns {{ dishes: Array, restaurants: Array, cuisines: Array }}
 */
export const getLocalSearchSuggestions = (rawQuery) => {
  const q = (rawQuery || '').trim().toLowerCase();
  if (!q) {
    // Default trending
    const topDishes = [];
    seedCatalogRestaurants.forEach(r => {
      r.dishes.forEach(d => {
        if (topDishes.length < 5) {
          topDishes.push({
            id: d.id,
            name: d.name,
            price: d.price,
            image: d.image,
            isVeg: d.isVeg,
            restaurantId: r.id,
            restaurantName: r.name,
            rating: d.rating
          });
        }
      });
    });

    return {
      dishes: topDishes,
      restaurants: seedCatalogRestaurants.slice(0, 3).map(r => ({
        id: r.id,
        name: r.name,
        image: r.image,
        cuisines: r.cuisines,
        rating: r.rating,
        deliveryTimeMinutes: r.deliveryTimeMinutes,
        area: r.area
      })),
      cuisines: popularCuisines.slice(0, 6)
    };
  }

  const matchedDishes = [];
  const matchedRestaurants = [];
  const matchedCuisines = [];

  // Match cuisines
  popularCuisines.forEach(c => {
    if (c.toLowerCase().includes(q)) {
      matchedCuisines.push(c);
    }
  });

  // Match restaurants & dishes
  seedCatalogRestaurants.forEach(r => {
    const restMatch = r.name.toLowerCase().includes(q) || r.cuisines.some(c => c.toLowerCase().includes(q));
    if (restMatch && matchedRestaurants.length < 6) {
      matchedRestaurants.push({
        id: r.id,
        name: r.name,
        image: r.image,
        cuisines: r.cuisines,
        rating: r.rating,
        deliveryTimeMinutes: r.deliveryTimeMinutes,
        area: r.area
      });
    }

    r.dishes.forEach(d => {
      const dishMatch = d.name.toLowerCase().includes(q);
      if (dishMatch && matchedDishes.length < 8) {
        matchedDishes.push({
          id: d.id,
          name: d.name,
          price: d.price,
          image: d.image,
          isVeg: d.isVeg,
          restaurantId: r.id,
          restaurantName: r.name,
          rating: d.rating
        });
      }
    });
  });

  return {
    dishes: matchedDishes,
    restaurants: matchedRestaurants,
    cuisines: matchedCuisines
  };
};
