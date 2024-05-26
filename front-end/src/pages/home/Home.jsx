import React from "react";
import "./Home.css";
import Header from "../../components/header/Header";
import { ExploreBrands } from "../../components/exploreBrands/ExploreBrands";
import { DisplayProduct } from "../../components/displayProduct/DisplayProduct";

const Home = () => {
  return (
    <div>
      <Header />
      <ExploreBrands />
      <DisplayProduct />
    </div>
  );
};
export default Home;
