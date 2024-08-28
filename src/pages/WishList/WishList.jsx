import React, { useState } from "react";
import style from "./WishList.module.css";
import { useContext } from "react";
import { WishListContext } from "../../Context/WishListContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/CartContext";
import { Helmet } from "react-helmet-async";

export default function WishList() {
  let { getLoggedWishList, removeWishListItem } = useContext(WishListContext);
  let { addProductToCart, setcartItemsCount } = useContext(CartContext);
  const [wishList, setwishList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updateLoading, setupdateLoading] = useState(false);

  async function getWishListItems() {
    setLoading(true);
    let response = await getLoggedWishList();
    console.log(response);

    if (response?.data?.status == "success") {
      setLoading(false);
      setwishList(response.data.data);
    }

    if (response?.response?.status == 404) {
      setLoading(false);
      setwishList({});
    }
  }

  async function addToCart(id) {
    setupdateLoading(true);
    let response = await addProductToCart(id);
    if (response.data.status == "success") {
      setupdateLoading(false);
      toast.success(response.data.message, {
        position: "top-right",
        style: {
          background: "green",
          color: "white",
          padding: "10px",
        },
      });
      setcartItemsCount(response.data.numOfCartItems);
    } else {
      setupdateLoading(false);
      toast.error(response.data.message, {
        position: "top-right",
        style: {
          background: "darkred",
          color: "white",
          padding: "10px",
        },
      });
    }
  }

  async function deleteProduct(id) {
    setupdateLoading(true);
    let response = await removeWishListItem(id);
    console.log(response.data);
    if (response.data.status == "success") {
      setupdateLoading(false);
      console.log(response.data.data);
      let newList = wishList.filter((product) =>
        response.data.data.includes(product.id)
      );
      console.log(newList);
      setwishList(newList);

      toast.success("Product Removed successfully", {
        position: "top-right",
      });
    } else {
      setupdateLoading(false);
      toast.error("Remove Failed Try Again");
    }
  }

  useEffect(() => {
    getWishListItems();
  }, []);
  return (
    <>
      <Helmet>
        <title>Wish List</title>
      </Helmet>
      <div
        className={
          updateLoading
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
      <div
        className={
          loading
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
      {wishList?.length ? (
        <>
          {" "}
          <div
            className={
              loading
                ? "hidden"
                : "text-3xl text-pink-700 mt-20 font-semibold text-left mx-10"
            }
          >
            My Wish List
          </div>
          <div
            className={
              loading
                ? "hidden"
                : "relative overflow-x-auto shadow-md sm:rounded-lg my-10"
            }
          >
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                </tr>
              </thead>
              <tbody>
                {wishList?.map((product) => {
                  return (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      key={product?.id}
                    >
                      <td className="p-4">
                        <img
                          src={product?.imageCover}
                          className="w-16 md:w-32 max-w-full max-h-full"
                          alt="Apple Watch"
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {product?.title}
                        <p className="m-2 text-emerald-700 text-xl">
                          {product?.price} EGP
                        </p>
                        <span
                          onClick={() => deleteProduct(product?.id)}
                          className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer flex items-center m-2 w-1/4"
                        >
                          <i className="fa-solid fa-trash text-red-500 m-1"></i>{" "}
                          Remove
                        </span>
                      </td>

                      <td className="px-6 py-4flex justify-center">
                        <div className="m-auto">
                          <button
                            className="my-3  px-8 py-2 outline-1 rounded-lg border border-emerald-500 text-emerald-950 transition-all duration-300 hover:bg-emerald-600 hover:text-emerald-50 hover:border-emerald-300"
                            onClick={() => addToCart(product?.id)}
                          >
                            Add To Cart
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="bg-slate-200 text-emerald-600 py-10 flex items-center justify-between px-12 my-20 text-3xl font-bold">
          Your Wish List is Empty{" "}
          <Link
            to="/products"
            className="underline underline-offset-1 cursor-pointer text-slate-700 transition-all duration-500 text-lg place-items-end hover:text-red-700 "
          >
            Go Add Now
          </Link>
        </div>
      )}
    </>
  );
}
