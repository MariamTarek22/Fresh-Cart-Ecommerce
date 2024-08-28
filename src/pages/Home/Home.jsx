import React, { useContext } from "react";
import style from "./Home.module.css";
import { CartContext } from "../../Context/CartContext";
import { Helmet } from "react-helmet-async";
import RecentProducts from "./../../components/RecentProducts/RecentProducts";
import CategoriesSlider from "./../../components/CategoriesSlider/CategoriesSlider";
import StaticSlider from "./../../components/staticSlider/staticSlider";

export default function Home() {
  let { addProductLoading } = useContext(CartContext);
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div
        className={
          addProductLoading
            ? "fixed inset-0 bg-slate-200 z-50 opacity-60 flex items-center "
            : "hidden"
        }
      >
        <div className=" sk-circle">
          <div className="sk-circle1 sk-child"></div>
          <div className="sk-circle2 sk-child"></div>
          <div className="sk-circle3 sk-child"></div>
          <div className="sk-circle4 sk-child"></div>
          <div className="sk-circle5 sk-child"></div>
          <div className="sk-circle6 sk-child"></div>
          <div className="sk-circle7 sk-child"></div>
          <div className="sk-circle8 sk-child"></div>
          <div className="sk-circle9 sk-child"></div>
          <div className="sk-circle10 sk-child"></div>
          <div className="sk-circle11 sk-child"></div>
          <div className="sk-circle12 sk-child"></div>
        </div>
      </div>
      <StaticSlider />
      <CategoriesSlider />
      <RecentProducts />
    </>
  );
}
