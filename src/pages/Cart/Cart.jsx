import React, { useState } from "react";
import style from "./Cart.module.css";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

export default function Cart() {
  let {
    getLoggedUserCart,
    updateProductQuantity,
    removeCartItem,
    setcartItemsCount,
    clearCartItems,
  } = useContext(CartContext);
  const [CartDetails, setCartDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updateLoading, setupdateLoading] = useState(false);

  async function getCartItems() {
    setLoading(true);
    let response = await getLoggedUserCart();
    if (response?.data?.status == "success") {
      setLoading(false);
      setCartDetails(response.data.data);
      setcartItemsCount(response.data.numOfCartItems);
    }

    if (response?.response?.status == 404) {
      setLoading(false);
      setCartDetails({ products: [] });
      setcartItemsCount(0);
    }
  }

  async function updateQuantity(id, count) {
    setupdateLoading(true);

    if (count == 0) {
      deleteProduct(id);
    } else {
      let response = await updateProductQuantity(id, count);
      console.log(response.data.data);
      if (response.data.status == "success") {
        setupdateLoading(false);
        setCartDetails(response.data.data);
        toast.success("Product Count Updated successfully", {
          position: "top-right",
        });
      } else {
        setupdateLoading(false);
        toast.error("Update Failed Try Again");
      }
    }
  }

  async function deleteProduct(id) {
    setupdateLoading(true);
    let response = await removeCartItem(id);
    console.log(response.data);
    if (response.data.status == "success") {
      setupdateLoading(false);
      setCartDetails(response.data.data);
      toast.success("Product Removed successfully", {
        position: "top-right",
      });
    } else {
      setupdateLoading(false);
      toast.error("Remove Failed Try Again");
    }
  }
  async function clearCart() {
    setupdateLoading(true);
    let response = await clearCartItems();
    console.log(response);
    if (response.data.message == "success") {
      setupdateLoading(false);
      setCartDetails({});
      setcartItemsCount(0);
    }
  }

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <>
      <Helmet>
        <title>Cart</title>
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
      {CartDetails?.products?.length ? (
        <>
          {" "}
          <div
            className={
              loading ? "hidden" : "flex justify-between items-center mt-10 p-5"
            }
          >
            <div className="text-4xl text-emerald-500 font-semibold">
              Cart Shop
            </div>
            <div>
              <Link to="/checkOut">
                <button className=" my-3 px-4 py-2 outline-1 rounded-lg border border-emerald-500 text-emerald-950 transition-all duration-300   hover:bg-emerald-600 hover:text-emerald-50 hover:border-emerald-300">
                  {" "}
                  Proceed To Checkout
                </button>
              </Link>
            </div>
          </div>
          <div className={loading ? "hidden" : style.cont}>
            <div>
              <span className={style.label}>Total Price:</span>
              <span className={style.amount}>
                {CartDetails?.totalCartPrice} EGP
              </span>
            </div>
            <div>
              <span className={style.label}>No of Items:</span>
              <span className={style.amount}>
                {CartDetails?.products?.length}
              </span>
            </div>
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
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {CartDetails?.products?.map((product) => {
                  return (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      key={product.product.id}
                    >
                      <td className="p-4">
                        <img
                          src={product.product.imageCover}
                          className="w-16 md:w-32 max-w-full max-h-full"
                          alt="Apple Watch"
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {product.product.title}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              updateQuantity(
                                product.product.id,
                                product.count - 1
                              )
                            }
                            className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3 text-red-600"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 2"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h16"
                              />
                            </svg>
                          </button>
                          <div>
                            <span>{product.count}</span>
                          </div>
                          <button
                            onClick={() =>
                              updateQuantity(
                                product.product.id,
                                product.count + 1
                              )
                            }
                            className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3 text-emerald-500"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 18"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 1v16M1 9h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {product.price} EGP
                      </td>
                      <td className="px-6 py-4">
                        <span
                          onClick={() => deleteProduct(product.product.id)}
                          className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
                        >
                          <i className="fa-solid fa-trash text-red-500"></i>{" "}
                          Remove
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div>
              <button
                onClick={clearCart}
                className="my-3 px-4 py-2 outline-1 rounded-lg border border-emerald-500 text-emerald-950 transition-all duration-300   hover:bg-red-600 hover:text-red-50 hover:border-red-300"
              >
                {" "}
                Clear Your Cart
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-slate-200 text-emerald-600 py-10 flex items-center justify-between px-12 my-20 text-3xl font-bold">
          Your Cart is Empty{" "}
          <Link
            to="/products"
            className="underline underline-offset-1 cursor-pointer text-slate-700 transition-all duration-500 text-lg place-items-end hover:text-red-700 "
          >
            Go shop Now
          </Link>
        </div>
      )}
    </>
  );
}
