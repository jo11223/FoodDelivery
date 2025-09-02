// import React, { useState, useEffect } from "react";
// import MenuFoodCard from "./MenuFoodCard";
// import styles from "./MenuSection.module.css";
// import sampleImage from "../../assets/images/hero.webp";
// import { useCart } from "../../Context/CartContext";

// const foodItems = [
//   {
//     id: 1,
//     name: "Traditional Injera Platter",
//     description:
//       "Authentic spongy bread with spiced lentils, vegetables, and meat",
//     price: 450,
//     badge: "Popular",
//     rating: 4.8,
//     image: sampleImage,
//     category: "Traditional",
//   },
//   {
//     id: 2,
//     name: "Fresh Injera Bread",
//     description: "Freshly made traditional Ethiopian sourdough flatbread",
//     price: 80,
//     rating: 4.5,
//     image: sampleImage,
//     category: "Vegetarian",
//   },
//   {
//     id: 3,
//     name: "Spiced Lamb",
//     description: "Tender lamb slow-cooked with traditional Tigrayan spices",
//     price: 380,
//     badge: "Spicy",
//     rating: 2.9,
//     image: sampleImage,
//     category: "Main Dishes",
//   },
//   {
//     id: 4,
//     name: "Honey Wine",
//     description: "Traditional fermented drink made from honey",
//     price: 120,
//     rating: 4.2,
//     image: sampleImage,
//     category: "Drinks",
//   },
// ];

// function MenuSection() {
//   const { handleAddToCart } = useCart();

//   const [activeFilter, setActiveFilter] = useState("All Items");
//   const [favorites, setFavorites] = useState([]);

//   useEffect(() => {
//     const stored = localStorage.getItem("favorites");
//     if (stored) {
//       setFavorites(JSON.parse(stored));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("favorites", JSON.stringify(favorites));
//   }, [favorites]);

//   const toggleFavorite = (id) => {
//     setFavorites((prev) =>
//       prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
//     );
//   };

//   const filteredItems = foodItems.filter((item) => {
//     if (activeFilter === "All Items") return true;
//     if (activeFilter === "🖤 Favorites") return favorites.includes(item.id);
//     return item.category === activeFilter;
//   });

//   const filterButtons = [
//     "All Items",
//     "Traditional",
//     "Main Dishes",
//     "Vegetarian",
//     "Drinks",
//     "🖤 Favorites",
//   ];

//   return (
//     <div className={styles.menuSection}>
//       <div className={styles.filterContainer}>
//         {filterButtons.map((btn) => (
//           <button
//             key={btn}
//             className={
//               activeFilter === btn
//                 ? btn === "🖤 Favorites"
//                   ? styles.favoriteFilterActive
//                   : styles.activeFilter
//                 : ""
//             }
//             onClick={() => setActiveFilter(btn)}
//           >
//             {btn}
//           </button>
//         ))}
//       </div>

//       <div className={styles.menuGrid}>
//         {filteredItems.map((item) => (
//           <MenuFoodCard
//             key={item.id}
//             image={item.image}
//             name={item.name}
//             description={item.description}
//             price={item.price}
//             badge={item.badge}
//             rating={item.rating}
//             onAddToCart={() => handleAddToCart(item)}
//             isFavorite={favorites.includes(item.id)}
//             onToggleFavorite={() => toggleFavorite(item.id)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default MenuSection;

import React, { useState, useEffect } from "react";
import MenuFoodCard from "./MenuFoodCard";
import styles from "./MenuSection.module.css";
import sampleImage from "../../assets/images/hero.webp";
import { useCart } from "../../Context/CartContext";

const foodItems = [
  {
    id: 1,
    name: "Traditional Injera Platter",
    description:
      "Authentic spongy bread with spiced lentils, vegetables, and meat",
    price: 450,
    badge: "Popular",
    rating: 4.8,
    image: sampleImage,
    category: "Traditional",
  },
  {
    id: 2,
    name: "Fresh Injera Bread",
    description: "Freshly made traditional Ethiopian sourdough flatbread",
    price: 80,
    rating: 4.5,
    image: sampleImage,
    category: "Vegetarian",
  },
  {
    id: 3,
    name: "Spiced Lamb",
    description: "Tender lamb slow-cooked with traditional Tigrayan spices",
    price: 380,
    badge: "Spicy",
    rating: 2.9,
    image: sampleImage,
    category: "Main Dishes",
  },
  {
    id: 4,
    name: "Honey Wine",
    description: "Traditional fermented drink made from honey",
    price: 120,
    rating: 4.2,
    image: sampleImage,
    category: "Drinks",
  },
];
function MenuSection() {
  const { handleAddToCart } = useCart();
  const [activeFilter, setActiveFilter] = useState("All Items");
  const [favorites, setFavorites] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) setLoggedInUser(JSON.parse(storedUser));

    const storedFavs = localStorage.getItem("favorites");
    if (storedFavs) setFavorites(JSON.parse(storedFavs));
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) => {
    if (!loggedInUser) {
      alert("Please log in to use favorites.");
      return;
    }

    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const filterButtons = [
    "All Items",
    "Traditional",
    "Main Dishes",
    "Vegetarian",
    "Drinks",
  ];

  if (loggedInUser) {
    filterButtons.push("🖤 Favorites");
  }

  const filteredItems = foodItems.filter((item) => {
    if (activeFilter === "All Items") return true;
    if (activeFilter === "🖤 Favorites") return favorites.includes(item.id);
    return item.category === activeFilter;
  });

  return (
    <div className={styles.menuSection}>
      <div className={styles.filterContainer}>
        {filterButtons.map((btn) => (
          <button
            key={btn}
            className={
              activeFilter === btn
                ? btn === "🖤 Favorites"
                  ? styles.favoriteFilterActive
                  : styles.activeFilter
                : ""
            }
            onClick={() => setActiveFilter(btn)}
          >
            {btn}
          </button>
        ))}
      </div>

      <div className={styles.menuGrid}>
        {filteredItems.map((item) => (
          <MenuFoodCard
            key={item.id}
            image={item.image}
            name={item.name}
            description={item.description}
            price={item.price}
            badge={item.badge}
            rating={item.rating}
            onAddToCart={() => handleAddToCart(item)}
            isFavorite={favorites.includes(item.id)}
            onToggleFavorite={() => toggleFavorite(item.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default MenuSection;
