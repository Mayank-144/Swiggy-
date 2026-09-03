const restaurants = [
  {
    id: "rst-1",
    name: "Biryani By Kilo",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80",
    cuisines: ["Biryani", "Hyderabadi", "North Indian", "Mughlai", "Kebabs"],
    primaryCuisine: "Biryani",
    rating: 4.4,
    totalRatingsString: "5K+ ratings",
    deliveryTime: "30-35 mins",
    deliveryTimeMinutes: 32,
    distance: "3.2 km",
    priceForTwo: 500,
    costForTwoMessage: "₹500 for two",
    discount: "60% OFF UPTO ₹120",
    discountCode: "STEALDEAL",
    isVeg: false,
    isPromoted: true,
    isBestseller: true,
    location: {
      area: "Koramangala 5th Block",
      city: "Bengaluru",
      address: "80 Feet Road, 5th Block, Koramangala, Bengaluru"
    },
    menuCategories: [
      {
        name: "Recommended Bestsellers",
        items: [
          {
            id: "bbk-101",
            name: "Hyderabadi Chicken Dum Biryani [1/2 Kg]",
            description: "Freshly dum cooked chicken biryani with authentic aromatic spices and succulent chicken pieces served in traditional earthen handi.",
            price: 395,
            originalPrice: 475,
            isVeg: false,
            isBestseller: true,
            rating: 4.6,
            ratingCount: 1840,
            image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=80",
            isCustomisable: true,
            category: "Recommended Bestsellers"
          },
          {
            id: "bbk-102",
            name: "Lucknowi Mutton Biryani [1/2 Kg]",
            description: "Mild & aromatic Lucknowi mutton biryani made with fragrant basmati rice and melting tender goat meat.",
            price: 525,
            originalPrice: 620,
            isVeg: false,
            isBestseller: true,
            rating: 4.5,
            ratingCount: 920,
            image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&auto=format&fit=crop&q=80",
            isCustomisable: true,
            category: "Recommended Bestsellers"
          },
          {
            id: "bbk-103",
            name: "Paneer Dum Biryani [1/2 Kg]",
            description: "Fresh malai paneer cubes marinated in chef's royal spice blend and cooked on slow dum with basmati rice.",
            price: 335,
            originalPrice: 395,
            isVeg: true,
            isBestseller: false,
            rating: 4.3,
            ratingCount: 650,
            image: "https://images.unsplash.com/photo-1642821373181-696a54913e93?w=500&auto=format&fit=crop&q=80",
            isCustomisable: false,
            category: "Recommended Bestsellers"
          }
        ]
      },
      {
        name: "Royal Kebabs & Starters",
        items: [
          {
            id: "bbk-201",
            name: "Galouti Kebab [4 Pcs]",
            description: "Mouth-melting minced lamb patties seasoned with 32 secret Lucknowi spices.",
            price: 380,
            originalPrice: 430,
            isVeg: false,
            isBestseller: true,
            rating: 4.7,
            ratingCount: 510,
            image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=500&auto=format&fit=crop&q=80",
            isCustomisable: false,
            category: "Royal Kebabs & Starters"
          },
          {
            id: "bbk-202",
            name: "Dahi Ke Kebab [6 Pcs]",
            description: "Crispy outer crust filled with spiced hung curd, bell peppers, and fresh coriander.",
            price: 275,
            originalPrice: 320,
            isVeg: true,
            isBestseller: false,
            rating: 4.4,
            ratingCount: 340,
            image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=80",
            isCustomisable: false,
            category: "Royal Kebabs & Starters"
          }
        ]
      },
      {
        name: "Desserts & Beverages",
        items: [
          {
            id: "bbk-301",
            name: "Matka Phirni",
            description: "Slow-cooked creamy ground rice pudding infused with saffron, cardamom and topped with slivered almonds and pistachios.",
            price: 135,
            originalPrice: 160,
            isVeg: true,
            isBestseller: true,
            rating: 4.8,
            ratingCount: 1100,
            image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=500&auto=format&fit=crop&q=80",
            isCustomisable: false,
            category: "Desserts & Beverages"
          },
          {
            id: "bbk-302",
            name: "Royal Rose Shikanji",
            description: "Refreshing traditional lemonade infused with Damascus rose syrup and black salt.",
            price: 95,
            originalPrice: 120,
            isVeg: true,
            isBestseller: false,
            rating: 4.2,
            ratingCount: 220,
            image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=80",
            isCustomisable: false,
            category: "Desserts & Beverages"
          }
        ]
      }
    ]
  },
  {
    id: "rst-2",
    name: "Domino's Pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80",
    cuisines: ["Pizzas", "Italian", "Fast Food", "Desserts"],
    primaryCuisine: "Pizza",
    rating: 4.3,
    totalRatingsString: "10K+ ratings",
    deliveryTime: "20-25 mins",
    deliveryTimeMinutes: 22,
    distance: "1.8 km",
    priceForTwo: 400,
    costForTwoMessage: "₹400 for two",
    discount: "50% OFF UPTO ₹100",
    discountCode: "DOMINOS50",
    isVeg: false,
    isPromoted: false,
    isBestseller: true,
    location: {
      area: "Indiranagar",
      city: "Bengaluru",
      address: "12th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru"
    },
    menuCategories: [
      {
        name: "Recommended",
        items: [
          {
            id: "dom-101",
            name: "Farmhouse Deluxe Veg Pizza",
            description: "Delightful combination of onion, capsicum, tomato & grilled mushroom with 100% real mozzarella cheese.",
            price: 299,
            originalPrice: 379,
            isVeg: true,
            isBestseller: true,
            rating: 4.5,
            ratingCount: 3400,
            image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&auto=format&fit=crop&q=80",
            isCustomisable: true,
            category: "Recommended"
          },
          {
            id: "dom-102",
            name: "Chicken Dominator Pizza",
            description: "Loaded with double barbecue chicken, peri-peri chicken, grilled chicken rashers & chicken sausage.",
            price: 399,
            originalPrice: 489,
            isVeg: false,
            isBestseller: true,
            rating: 4.6,
            ratingCount: 4200,
            image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&auto=format&fit=crop&q=80",
            isCustomisable: true,
            category: "Recommended"
          },
          {
            id: "dom-103",
            name: "Peppy Paneer Pizza",
            description: "Flavorful trio of juicy paneer, crisp capsicum with spicy red paprika.",
            price: 289,
            originalPrice: 349,
            isVeg: true,
            isBestseller: false,
            rating: 4.4,
            ratingCount: 2100,
            image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&auto=format&fit=crop&q=80",
            isCustomisable: true,
            category: "Recommended"
          }
        ]
      },
      {
        name: "Sides & Desserts",
        items: [
          {
            id: "dom-201",
            name: "Stuffed Garlic Breadsticks",
            description: "Freshly baked garlic breadsticks stuffed with cheesy jalapeño and sweet corn filling.",
            price: 159,
            originalPrice: 189,
            isVeg: true,
            isBestseller: true,
            rating: 4.7,
            ratingCount: 5600,
            image: "https://images.unsplash.com/photo-1619881589886-538466661a55?w=500&auto=format&fit=crop&q=80",
            isCustomisable: false,
            category: "Sides & Desserts"
          },
          {
            id: "dom-202",
            name: "Choco Lava Cake",
            description: "Warm, indulgent chocolate cake with a molten liquid chocolate center.",
            price: 109,
            originalPrice: 139,
            isVeg: true,
            isBestseller: true,
            rating: 4.9,
            ratingCount: 7800,
            image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&auto=format&fit=crop&q=80",
            isCustomisable: false,
            category: "Sides & Desserts"
          }
        ]
      }
    ]
  },
  {
    id: "rst-3",
    name: "Burger King",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&auto=format&fit=crop&q=80",
    cuisines: ["Burgers", "American", "Fast Food", "Beverages", "Snacks"],
    primaryCuisine: "Burgers",
    rating: 4.2,
    totalRatingsString: "8K+ ratings",
    deliveryTime: "25-30 mins",
    deliveryTimeMinutes: 26,
    distance: "2.1 km",
    priceForTwo: 350,
    costForTwoMessage: "₹350 for two",
    discount: "40% OFF UPTO ₹80",
    discountCode: "BK40",
    isVeg: false,
    isPromoted: true,
    isBestseller: true,
    location: {
      area: "HSR Layout",
      city: "Bengaluru",
      address: "27th Main Rd, Sector 1, HSR Layout, Bengaluru"
    },
    menuCategories: [
      {
        name: "Whoppers & Burgers",
        items: [
          {
            id: "bk-101",
            name: "Crispy Veg Burger Combo",
            description: "Crunchy veg patty topped with creamy Thousand Island sauce, fresh lettuce and sesame buns. Served with fries & beverage.",
            price: 189,
            originalPrice: 249,
            isVeg: true,
            isBestseller: true,
            rating: 4.3,
            ratingCount: 1540,
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80",
            isCustomisable: true,
            category: "Whoppers & Burgers"
          },
          {
            id: "bk-102",
            name: "Chicken Whopper Deluxe",
            description: "Signature flame-grilled chicken patty topped with juicy tomatoes, fresh lettuce, creamy mayo, ketchup, crunchy pickles, and sliced onions.",
            price: 249,
            originalPrice: 299,
            isVeg: false,
            isBestseller: true,
            rating: 4.6,
            ratingCount: 3100,
            image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&auto=format&fit=crop&q=80",
            isCustomisable: true,
            category: "Whoppers & Burgers"
          },
          {
            id: "bk-103",
            name: "Fiery Hell Chicken Burger",
            description: "Spicy breaded chicken patty drenched in ghost pepper sauce, served on toasted brioche buns.",
            price: 219,
            originalPrice: 269,
            isVeg: false,
            isBestseller: false,
            rating: 4.4,
            ratingCount: 890,
            image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500&auto=format&fit=crop&q=80",
            isCustomisable: false,
            category: "Whoppers & Burgers"
          }
        ]
      },
      {
        name: "Fries & Shakes",
        items: [
          {
            id: "bk-201",
            name: "Peri Peri Cheesy Fries",
            description: "Crispy golden french fries tossed with spicy African peri peri seasoning and drizzled with warm cheddar sauce.",
            price: 139,
            originalPrice: 169,
            isVeg: true,
            isBestseller: true,
            rating: 4.5,
            ratingCount: 2200,
            image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=500&auto=format&fit=crop&q=80",
            isCustomisable: false,
            category: "Fries & Shakes"
          },
          {
            id: "bk-202",
            name: "Thick Chocolate Shake",
            description: "Velvety blend of rich Belgian chocolate and thick vanilla dairy cream.",
            price: 149,
            originalPrice: 179,
            isVeg: true,
            isBestseller: false,
            rating: 4.3,
            ratingCount: 780,
            image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&auto=format&fit=crop&q=80",
            isCustomisable: false,
            category: "Fries & Shakes"
          }
        ]
      }
    ]
  },
  {
    id: "rst-4",
    name: "Haldiram's Sweets & Snacks",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80",
    cuisines: ["North Indian", "Chaat", "Sweets", "Thali", "Street Food"],
    primaryCuisine: "North Indian",
    rating: 4.5,
    totalRatingsString: "15K+ ratings",
    deliveryTime: "20-25 mins",
    deliveryTimeMinutes: 24,
    distance: "1.4 km",
    priceForTwo: 300,
    costForTwoMessage: "₹300 for two",
    discount: "30% OFF UPTO ₹75",
    discountCode: "HALDIRAM30",
    isVeg: true,
    isPromoted: false,
    isBestseller: true,
    location: {
      area: "Jayanagar 4th Block",
      city: "Bengaluru",
      address: "11th Main Rd, 4th Block, Jayanagar, Bengaluru"
    },
    menuCategories: [
      {
        name: "North Indian Delicacies",
        items: [
          {
            id: "hld-101",
            name: "Amritsari Chole Bhature [2 Pcs]",
            description: "Authentic Delhi-style spicy pindi chole served with 2 large fluffy bhaturas, pickled carrots and mint chutney.",
            price: 195,
            originalPrice: 230,
            isVeg: true,
            isBestseller: true,
            rating: 4.8,
            ratingCount: 6200,
            image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500&auto=format&fit=crop&q=80",
            isCustomisable: false,
            category: "North Indian Delicacies"
          },
          {
            id: "hld-102",
            name: "Special Delhi Pav Bhaji",
            description: "Spiced mashed vegetable curry loaded with butter, served with 2 toasted pavs and lemon onion salad.",
            price: 175,
            originalPrice: 210,
            isVeg: true,
            isBestseller: true,
            rating: 4.6,
            ratingCount: 3900,
            image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500&auto=format&fit=crop&q=80",
            isCustomisable: false,
            category: "North Indian Delicacies"
          },
          {
            id: "hld-103",
            name: "Royal Raj Kachori Chaat",
            description: "Crispy jumbo kachori stuffed with diced potatoes, sprouts, sweetened yogurt, tamarind and coriander chutney.",
            price: 145,
            originalPrice: 170,
            isVeg: true,
            isBestseller: true,
            rating: 4.7,
            ratingCount: 4100,
            image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=80",
            isCustomisable: false,
            category: "North Indian Delicacies"
          }
        ]
      },
      {
        name: "Authentic Sweets",
        items: [
          {
            id: "hld-201",
            name: "Desi Ghee Gulab Jamun [2 Pcs]",
            description: "Soft cottage cheese balls simmered in warm saffron cardamom sugar syrup.",
            price: 75,
            originalPrice: 90,
            isVeg: true,
            isBestseller: true,
            rating: 4.9,
            ratingCount: 5200,
            image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=500&auto=format&fit=crop&q=80",
            isCustomisable: false,
            category: "Authentic Sweets"
          },
          {
            id: "hld-202",
            name: "Kaju Katli [250 gms]",
            description: "Premium diamond-shaped cashew fudge with edible silver leaf.",
            price: 290,
            originalPrice: 340,
            isVeg: true,
            isBestseller: true,
            rating: 4.8,
            ratingCount: 3100,
            image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=500&auto=format&fit=crop&q=80",
            isCustomisable: false,
            category: "Authentic Sweets"
          }
        ]
      }
    ]
  },
  {
    id: "rst-5",
    name: "Mainland China",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80",
    cuisines: ["Chinese", "Asian", "Dim Sum", "Noodles", "Seafood"],
    primaryCuisine: "Chinese",
    rating: 4.5,
    totalRatingsString: "3K+ ratings",
    deliveryTime: "35-40 mins",
    deliveryTimeMinutes: 38,
    distance: "4.5 km",
    priceForTwo: 700,
    costForTwoMessage: "₹700 for two",
    discount: "FLAT ₹150 OFF",
    discountCode: "CHINA150",
    isVeg: false,
    isPromoted: true,
    isBestseller: false,
    location: {
      area: "MG Road",
      city: "Bengaluru",
      address: "1st Floor, Church Street, Off MG Road, Bengaluru"
    },
    menuCategories: [
      {
        name: "Dimsums & Starters",
        items: [
          {
            id: "mc-101",
            name: "Steamed Chicken & Basil Dumplings [6 Pcs]",
            description: "Translucent parcels stuffed with minced chicken, Thai basil, and scallions with chilli oil dip.",
            price: 345,
            originalPrice: 395,
            isVeg: false,
            isBestseller: true,
            rating: 4.7,
            ratingCount: 820,
            image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=500&auto=format&fit=crop&q=80",
            isCustomisable: false,
            category: "Dimsums & Starters"
          },
          {
            id: "mc-102",
            name: "Crispy Chilli Babycorn & Mushroom",
            description: "Crispy fried golden babycorn and button mushrooms tossed with spicy ginger-garlic soya glaze.",
            price: 295,
            originalPrice: 340,
            isVeg: true,
            isBestseller: false,
            rating: 4.4,
            ratingCount: 460,
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=80",
            isCustomisable: false,
            category: "Dimsums & Starters"
          }
        ]
      },
      {
        name: "Noodles & Rice",
        items: [
          {
            id: "mc-201",
            name: "Cantonese Hakka Noodles (Chicken)",
            description: "Wok-tossed hand-pulled noodles with julienned veggies, eggs and tender shredded chicken.",
            price: 365,
            originalPrice: 420,
            isVeg: false,
            isBestseller: true,
            rating: 4.6,
            ratingCount: 1200,
            image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=80",
            isCustomisable: true,
            category: "Noodles & Rice"
          },
          {
            id: "mc-202",
            name: "Schezwan Fried Rice (Veg)",
            description: "Fluffy jasmine rice tossed in fiery home-made Sichuan pepper chili sauce and garden vegetables.",
            price: 310,
            originalPrice: 360,
            isVeg: true,
            isBestseller: false,
            rating: 4.3,
            ratingCount: 680,
            image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&auto=format&fit=crop&q=80",
            isCustomisable: true,
            category: "Noodles & Rice"
          }
        ]
      }
    ]
  },
  {
    id: "rst-6",
    name: "Wow! Momo",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80",
    cuisines: ["Tibetan", "Momos", "Fast Food", "Snacks"],
    primaryCuisine: "Momos",
    rating: 4.3,
    totalRatingsString: "6K+ ratings",
    deliveryTime: "20-25 mins",
    deliveryTimeMinutes: 22,
    distance: "1.2 km",
    priceForTwo: 250,
    costForTwoMessage: "₹250 for two",
    discount: "50% OFF UPTO ₹100",
    discountCode: "WOW50",
    isVeg: false,
    isPromoted: false,
    isBestseller: true,
    location: {
      area: "BTM Layout",
      city: "Bengaluru",
      address: "Outer Ring Road, BTM 2nd Stage, Bengaluru"
    },
    menuCategories: [
      {
        name: "Steamed & Pan Fried Momos",
        items: [
          {
            id: "wm-101",
            name: "Steamed Chicken Cheese Momo [6 Pcs]",
            description: "Juicy chicken momos infused with molten cheese, served with spicy red chilli sauce and mayonnaise.",
            price: 189,
            originalPrice: 229,
            isVeg: false,
            isBestseller: true,
            rating: 4.6,
            ratingCount: 2800,
            image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&auto=format&fit=crop&q=80",
            isCustomisable: false,
            category: "Steamed & Pan Fried Momos"
          },
          {
            id: "wm-102",
            name: "Pan Fried Veg Schezwan Momo [6 Pcs]",
            description: "Crispy bottom vegetable momos tossed in sweet and spicy Schezwan glaze.",
            price: 169,
            originalPrice: 199,
            isVeg: true,
            isBestseller: true,
            rating: 4.4,
            ratingCount: 1900,
            image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=500&auto=format&fit=crop&q=80",
            isCustomisable: false,
            category: "Steamed & Pan Fried Momos"
          },
          {
            id: "wm-103",
            name: "Chicken Moburg",
            description: "Two crispy chicken fried momos sandwiched inside a burger bun with thousand island dressing.",
            price: 129,
            originalPrice: 159,
            isVeg: false,
            isBestseller: false,
            rating: 4.2,
            ratingCount: 850,
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80",
            isCustomisable: false,
            category: "Steamed & Pan Fried Momos"
          }
        ]
      }
    ]
  },
  {
    id: "rst-7",
    name: "The Belgian Waffle Co.",
    image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=800&auto=format&fit=crop&q=80",
    cuisines: ["Desserts", "Waffles", "Bakery", "Beverages"],
    primaryCuisine: "Desserts",
    rating: 4.6,
    totalRatingsString: "7K+ ratings",
    deliveryTime: "15-20 mins",
    deliveryTimeMinutes: 18,
    distance: "1.0 km",
    priceForTwo: 300,
    costForTwoMessage: "₹300 for two",
    discount: "20% OFF UPTO ₹50",
    discountCode: "SWEET20",
    isVeg: true,
    isPromoted: false,
    isBestseller: true,
    location: {
      area: "Koramangala 4th Block",
      city: "Bengaluru",
      address: "17th Main Rd, 4th Block, Koramangala, Bengaluru"
    },
    menuCategories: [
      {
        name: "Signature Waffles",
        items: [
          {
            id: "bw-101",
            name: "Triple Chocolate Waffle",
            description: "Warm crisp chocolate waffle layered with molten white chocolate, milk chocolate and dark Belgian chocolate.",
            price: 175,
            originalPrice: 210,
            isVeg: true,
            isBestseller: true,
            rating: 4.8,
            ratingCount: 3900,
            image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=500&auto=format&fit=crop&q=80",
            isCustomisable: true,
            category: "Signature Waffles"
          },
          {
            id: "bw-102",
            name: "Nutella Butter Waffle",
            description: "Classic golden crispy waffle smeared with abundant rich Hazelnut Nutella.",
            price: 185,
            originalPrice: 220,
            isVeg: true,
            isBestseller: true,
            rating: 4.9,
            ratingCount: 4500,
            image: "https://images.unsplash.com/photo-1598214886806-c87b84b7078b?w=500&auto=format&fit=crop&q=80",
            isCustomisable: true,
            category: "Signature Waffles"
          },
          {
            id: "bw-103",
            name: "Red Velvet Waffle Cake",
            description: "Red velvet waffle with white chocolate spread and cream cheese frosting.",
            price: 165,
            originalPrice: 195,
            isVeg: true,
            isBestseller: false,
            rating: 4.5,
            ratingCount: 1200,
            image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=500&auto=format&fit=crop&q=80",
            isCustomisable: false,
            category: "Signature Waffles"
          }
        ]
      }
    ]
  },
  {
    id: "rst-8",
    name: "Punjab Grill",
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=800&auto=format&fit=crop&q=80",
    cuisines: ["North Indian", "Punjabi", "Tandoor", "Biryani"],
    primaryCuisine: "North Indian",
    rating: 4.6,
    totalRatingsString: "4K+ ratings",
    deliveryTime: "30-35 mins",
    deliveryTimeMinutes: 34,
    distance: "3.8 km",
    priceForTwo: 800,
    costForTwoMessage: "₹800 for two",
    discount: "40% OFF UPTO ₹150",
    discountCode: "PUNJAB40",
    isVeg: false,
    isPromoted: true,
    isBestseller: true,
    location: {
      area: "Whitefield",
      city: "Bengaluru",
      address: "Phoenix Marketcity, Mahadevapura, Whitefield, Bengaluru"
    },
    menuCategories: [
      {
        name: "Main Course & Curries",
        items: [
          {
            id: "pg-101",
            name: "Butter Chicken (Murgh Makhani)",
            description: "Charcoal grilled boneless chicken simmered in rich creamy tomato and cashew nut gravy enriched with fenugreek butter.",
            price: 465,
            originalPrice: 530,
            isVeg: false,
            isBestseller: true,
            rating: 4.8,
            ratingCount: 2200,
            image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=500&auto=format&fit=crop&q=80",
            isCustomisable: false,
            category: "Main Course & Curries"
          },
          {
            id: "pg-102",
            name: "Dal Makhani (Slow Cooked 24hrs)",
            description: "Black lentils slow-cooked overnight with tomatoes, butter and fresh cream on gentle charcoal fire.",
            price: 365,
            originalPrice: 420,
            isVeg: true,
            isBestseller: true,
            rating: 4.9,
            ratingCount: 3400,
            image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=80",
            isCustomisable: false,
            category: "Main Course & Curries"
          },
          {
            id: "pg-103",
            name: "Garlic Butter Naan",
            description: "Traditional refined flour flatbread baked in clay tandoor and brushed with garlic butter.",
            price: 85,
            originalPrice: 100,
            isVeg: true,
            isBestseller: true,
            rating: 4.7,
            ratingCount: 4500,
            image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500&auto=format&fit=crop&q=80",
            isCustomisable: false,
            category: "Main Course & Curries"
          }
        ]
      }
    ]
  }
];

const categories = [
  { id: "all", name: "All Foods", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&auto=format&fit=crop&q=80" },
  { id: "Biryani", name: "Biryani", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&auto=format&fit=crop&q=80" },
  { id: "Pizza", name: "Pizzas", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&auto=format&fit=crop&q=80" },
  { id: "Burgers", name: "Burgers", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&auto=format&fit=crop&q=80" },
  { id: "North Indian", name: "North Indian", image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=200&auto=format&fit=crop&q=80" },
  { id: "Chinese", name: "Chinese", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200&auto=format&fit=crop&q=80" },
  { id: "Momos", name: "Momos", image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=200&auto=format&fit=crop&q=80" },
  { id: "Desserts", name: "Desserts", image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=200&auto=format&fit=crop&q=80" }
];

const mockUsers = [
  {
    _id: "usr-demo-01",
    name: "Mayank Jaiswal",
    email: "demo@swiggy.com",
    phone: "+91 98765 43210",
    password: "$2a$10$YourHashedPasswordOrPlainFallback", // Handled in controller
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    addresses: [
      {
        _id: "addr-1",
        title: "Home",
        flatNo: "Flat 402, Sunshine Heights",
        landmark: "Near Forum Mall",
        area: "Koramangala 7th Block",
        city: "Bengaluru",
        pincode: "560095",
        isDefault: true
      },
      {
        _id: "addr-2",
        title: "Work",
        flatNo: "Tower B, 6th Floor, Tech Park",
        landmark: "Next to Metro Station",
        area: "Indiranagar",
        city: "Bengaluru",
        pincode: "560038",
        isDefault: false
      }
    ],
    favorites: ["rst-1", "rst-2"]
  }
];

const mockOrders = [
  {
    orderId: "SWG-782194",
    userId: "usr-demo-01",
    userEmail: "demo@swiggy.com",
    restaurant: {
      id: "rst-1",
      name: "Biryani By Kilo",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=80",
      area: "Koramangala 5th Block"
    },
    items: [
      {
        id: "bbk-101",
        name: "Hyderabadi Chicken Dum Biryani [1/2 Kg]",
        price: 395,
        quantity: 1,
        isVeg: false,
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=80"
      },
      {
        id: "bbk-301",
        name: "Matka Phirni",
        price: 135,
        quantity: 1,
        isVeg: true,
        image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=500&auto=format&fit=crop&q=80"
      }
    ],
    bill: {
      itemTotal: 530,
      deliveryFee: 35,
      platformFee: 5,
      taxes: 26,
      discount: 100,
      tip: 20,
      grandTotal: 516,
      couponApplied: "SWIGGY50"
    },
    deliveryAddress: {
      title: "Home",
      flatNo: "Flat 402, Sunshine Heights",
      landmark: "Near Forum Mall",
      area: "Koramangala 7th Block",
      city: "Bengaluru",
      pincode: "560095",
      phone: "+91 98765 43210"
    },
    paymentMethod: "UPI",
    paymentStatus: "PAID",
    orderStatus: "DELIVERED",
    deliveryPartner: {
      name: "Ramesh Kumar",
      phone: "+91 98123 45678",
      rating: 4.8,
      vehicleNumber: "KA 01 EK 4920",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    deliveryTimeEstimate: "Delivered",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
  }
];

module.exports = {
  restaurants,
  categories,
  mockUsers,
  mockOrders
};
