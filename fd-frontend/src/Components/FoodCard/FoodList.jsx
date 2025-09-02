import React from "react";
import FoodCard from "./FoodCard";
import sampleImage from "../../assets/images/hero.webp";
import { useCart } from "../../Context/CartContext";
// import { BiFontSize } from "react-icons/bi";

const foodItems = [
  {
    id: 1,
    name: "Kitfo Special",
    description: "Spiced Ethiopian minced meat served with injera.",
    price: 120,
    image: sampleImage,
  },
  {
    id: 2,
    name: "Tibs",
    description:
      "Sautéed meat cubes with onions, garlic, and pepper,onions, garlic, and pepper.",
    price: 100,
    image: sampleImage,
  },
  {
    id: 3,
    name: "Doro Wat",
    description: "Spicy chicken stew with hard-boiled eggs.",
    price: 150,
    image: sampleImage,
  },
  {
    id: 5,
    name: "Gomen/sga Special",
    description: "Spiced Ethiopian minced meat served with injera.",
    price: 120,
    image: sampleImage,
  },
  {
    id: 6,
    name: "GoredGored",
    description: "Sautéed meat cubes with onions, garlic, and pepper.",
    price: 100,
    image: sampleImage,
  },
  {
    id: 7,
    name: "QQL",
    description:
      "Spicy chicken stew with hard-boiled eggs. chicken stew with hard-boiled eggs",
    price: 150,
    image: sampleImage,
  },
];

function FoodList() {
  const { handleAddToCart } = useCart();

  return (
    <div
      style={{ backgroundColor: "#fff", marginBottom: "0", paddingBottom: "0" }}
    >
      <div
        style={{
          textAlign: "center",
          fontSize: "2.5rem",
          fontWeight: "700",
          padding: "30px",
        }}
      >
        Signature Dishes
      </div>
      <div
        style={{
          display: "flex",
          gap: "2rem",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        {foodItems.map((item) => (
          <FoodCard
            key={item.id}
            image={item.image}
            name={item.name}
            description={item.description}
            price={item.price}
            onAddToCart={() => handleAddToCart(item)}
          />
        ))}
      </div>
    </div>
  );
}

export default FoodList;
