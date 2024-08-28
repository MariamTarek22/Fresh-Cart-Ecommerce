import React, { useContext, useEffect } from "react";
import style from "./CategoryProducts.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CartContext } from "../../Context/CartContext";
import { WishListContext } from "../../Context/WishListContext";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import Notfound from "../../pages/Notfound/Notfound";


export default function CategoryProducts() {
  let { category } = useParams();
  const [CategoryProducts, setCategoryProducts] = useState(null);

  async function getProducts() {
    let res = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products`
    );
    getCategoryProducts(res.data.data);
    return res;
  }
  let { data, error, isError, isLoading, isFetching } = useQuery({
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
    console.log(filteredProducts);
  }

  const [Loading, setLoading] = useState(false);
  let { addProductToCart, setaddProductLoading, setcartItemsCount } =
    useContext(CartContext);
  let { addProductToWishList, getLoggedWishList } = useContext(WishListContext);

  async function getWishListItems() {
    let response = await getLoggedWishList();
    console.log(response);
    if (response?.data?.status == "success") {
      let wishlistProductsIds = response.data.data.map((product) => product.id);
      setwishlist(wishlistProductsIds);
    }

    if (response?.response?.status == 404) {
      setwishlist({});
    }
  }

  async function addToWishList(id) {
    setLoading(true);
    let res = await addProductToWishList(id);
    console.log(res.data);
    if (res.data.status == "success") {
      setwishlist(res.data.data);
      setLoading(false);
      toast.success(res.data.message, {
        position: "top-right",
        style: {
          padding: "10px",
        },
      });
    } else {
      setLoading(false);
      toast.error(res.data.message, {
        position: "top-right",
        style: {
          padding: "10px",
        },
      });
    }
  }
  async function addToCart(productId) {
    setLoading(true);
    let response = await addProductToCart(productId);
    if (response.data.status == "success") {
      setLoading(false);
      toast.success(response.data.message, {
        position: "top-right",
        style: {
          padding: "10px",
        },
      });
      setcartItemsCount(response.data.numOfCartItems);
    } else {
      setLoading(false);
      toast.error(response.data.message, {
        position: "top-right",
        style: {
          padding: "10px",
        },
      });
    }
  }
  const [wishlist, setwishlist] = useState([]);
  useEffect(() => {
    getWishListItems();
  }, []);

  if (isError) {
    return <Notfound error={error.message} />;
  }
  if (isLoading) {
    return (
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
    );
  }
  return (
    <>
      <Helmet>
        <title>{category} Category Products</title>
      </Helmet>
      <div
        className={
          Loading
            ? "fixed inset-0 bg-gray-100 bg-opacity-40 z-10 flex items-center "
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
          <h2 className="text-3xl text-emerald-700 text-center my-20">
            No Products Found
          </h2>
        ) : (
          CategoryProducts.map((product) => {
            return (
              <div key={product.id} className="w-full  lg:w-1/4 md:w-1/3">
                <div className="product p-5 ">
                  <Link
                    to={`/productDetails/${product.category.name}/${product.id}`}
                  >
                    <img src={product.imageCover} className="w-full" alt="" />
                    <h3 className=" text-emerald-600">
                      {product.category.name}
                    </h3>
                    <h3 className="mb-2 font-semibold">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h3>
                    <div className=" flex justify-between p-3">
                      <span>{product.price} EGP</span>
                      <span>
                        <i className="fas fa-star px-1 text-yellow-300"></i>
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </Link>
                  <div className="flex">
                    <button
                      onClick={() => addToCart(product.id)}
                      className="btn"
                    >
                      <i className="fa-solid fa-plus"></i> Add to Cart
                    </button>
                    <span
                      onClick={() => addToWishList(product.id)}
                      className="cursor-pointer"
                    >
                      <i
                        className={
                          wishlist.find((productid) => productid == product.id)
                            ? "fa-solid fa-heart text-xl my-2 mx-3 text-red-600"
                            : "fa-solid fa-heart text-xl my-2 mx-3"
                        }
                      ></i>
                    </span>
                  </div>{" "}
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
