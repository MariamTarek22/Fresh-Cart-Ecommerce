import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import Notfound from "../../pages/Notfound/Notfound";
import ProductCard from './../ProductCard/ProductCard';
import { CartContext } from "../../Context/CartContext";

export default function CategoryProducts() {
  let { category } = useParams();
  const [CategoryProducts, setCategoryProducts] = useState(null);
  let { addProductLoading } = useContext(CartContext);
  
  async function getProducts() {
    let res = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products`
    );
    getCategoryProducts(res.data.data);
    return res;
  }
  let { data, error, isError, isLoading } = useQuery({
    queryKey: ["recentProducts"],
    queryFn: getProducts,
    // staleTime:10000,
  });

  function getCategoryProducts(allProducts) {
    let filteredProducts = allProducts.filter(
      (product) => product.category.name == category
    );

    if (filteredProducts.length != 0) {
      setCategoryProducts(filteredProducts);
    } else if (filteredProducts.length == 0) {
      setCategoryProducts([]);
    }
  }

  if (isError) {
    return <Notfound error={error.message} />;
  }
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gray-100 bg-opacity-40 z-10 flex items-center ">
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
    );
  }
  return (
    <>
      <Helmet>
        <title>{category} Category Products</title>
      </Helmet>

      {/* loaderr */}
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

      <div className="row w-full mt-5">
        {CategoryProducts == null ? ( //first filteredproducts is null in the first rendered so spinner will be displayed when filteredprocucts is computed se it either (empty length is 0) so no products found displayed or notempty displayproducts
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
        ) : CategoryProducts.length == 0 ? (
          <h2 className="text-3xl text-emerald-700 text-center my-20 font-extrabold">
            No Products Found !
          </h2>
        ) : (
          CategoryProducts.map((product) => {
            return (
              <ProductCard product={product} key={product.id}/>
            );
          })
        )}
      </div>
    </>
  );
}
