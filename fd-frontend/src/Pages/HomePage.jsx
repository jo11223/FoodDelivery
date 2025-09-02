import React from "react";
import Hero from "../Components/Hero/Hero";
import FoodList from "../Components/FoodCard/FoodList";
import AboutSection from "../Components/AboutUs/AboutSection";

function Home() {
  return (
    <div>
      <Hero />
      <FoodList />
      <AboutSection />
    </div>
  );
}

export default Home;
