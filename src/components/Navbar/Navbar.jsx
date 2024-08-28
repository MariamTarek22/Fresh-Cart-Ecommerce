import React, { useContext, useState } from "react";
import style from "./Navbar.module.css";
import logo from "../../assets/logo.svg";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  const [isMenuOpen, setisMenuOpen] = useState(false);
  let Navigate = useNavigate();
  let { userLogin, setuserLogin } = useContext(UserContext);
  let { cartItemsCount } = useContext(CartContext);
  // console.log(cartItemsCount);
  function toggleMenu() {
    setisMenuOpen(!isMenuOpen);
  }
  function signOut() {
    Navigate("/login");
    setuserLogin(null);
    localStorage.removeItem("userToken");
  }

  return (
    <>
      {/* <nav className=" border-gray-200 bg-slate-200 fixed top-0 left-0 right-0 z-10">
        <div className="flex flex-wrap justify-center md:justify-between items-center mx-auto max-w-screen-xl p-4">
          <div className="flex items-center  gap-5">
            <Link
              to=""
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                src={logo}
                width="150px"
                className="h-8"
                alt="FreshCart Logo"
              />
            </Link>
            {userLogin != null ? (
              <ul className="flex gap-5 items-center">
                <li>
                  {" "}
                  <NavLink to="">Home</NavLink>
                </li>
                <li>
                  {" "}
                  <NavLink to="cart">Cart</NavLink>
                </li>
                <li>
                  {" "}
                  <NavLink to="wishlist">Wish List</NavLink>
                </li>
                <li>
                  {" "}
                  <NavLink to="categories">Categories</NavLink>
                </li>
                <li>
                  {" "}
                  <NavLink to="products">Products</NavLink>
                </li>
                <li>
                  {" "}
                  <NavLink to="brands">Brands</NavLink>
                </li>
              </ul>
            ) : null}
          </div>

          <div className="flex items-center space-x-6 rtl:space-x-reverse text-black">
            <div className="icons flex gap-4 ">
              <i className="fa-brands fa-facebook"></i>
              <i className="fa-brands fa-linkedin"></i>
              <i className="fa-brands fa-youtube"></i>
              <i className="fa-brands fa-tiktok"></i>
              <i className="fa-brands fa-twitter"></i>
            </div>
            <div className="links flex gap-4">
              {userLogin ? null : (
                <>
                  <Link
                    to="login"
                    className="text-sm cursor-pointer transition-all duration-500 hover:bg-emerald-500 hover:rounded-lg hover:text-white py-2 hover:px-2 "
                  >
                    Register
                  </Link>
                  <Link
                    to="register"
                    className="text-sm cursor-pointer transition-all duration-500 hover:bg-emerald-500 hover:rounded-lg hover:text-white py-2 hover:px-2"
                  >
                    Sign up
                  </Link>
                </>
              )}
              {userLogin ? (
                <div>
                  {" "}
                  <Link to="/cart">
                    {" "}
                    <i className="fa-solid fa-cart-shopping text-slate-600 p-5 text-xl transition-all duration-500 hover:text-slate-950 relative">
                      <span
                        className={
                          cartItemsCount
                            ? "absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-emerald-600 rounded-full "
                            : "hidden"
                        }
                      >
                        {cartItemsCount}
                      </span>
                    </i>
                  </Link>
                  <span
                    onClick={signOut}
                    className="text-sm cursor-pointer transition-all duration-500 hover:bg-red-500 hover:rounded-lg hover:text-white hover:p-2 "
                  >
                    SignOut
                  </span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </nav> */}

      <nav className="border-gray-200 bg-slate-200 dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b  dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to=""
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src={logo}
              width="150px"
              className="h-8"
              alt="FreshCart Logo"
            />
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div className="links flex gap-4">
              {userLogin ? null : (
                <>
                  <Link
                    to="login"
                    className="text-sm cursor-pointer transition-all duration-500 hover:bg-emerald-500 hover:rounded-lg hover:text-white py-2 hover:px-2 "
                  >
                    Login
                  </Link>
                  <Link
                    to="register"
                    className="text-sm cursor-pointer transition-all duration-500 hover:bg-emerald-500 hover:rounded-lg hover:text-white py-2 hover:px-2"
                  >
                    Sign up
                  </Link>
                </>
              )}
              {userLogin ? (
                <div className=" flex items-center justify-center">
                  {" "}
                  <Link to="/cart">
                    {" "}
                    <i className="fa-solid fa-cart-shopping text-slate-600 p-5 text-xl transition-all duration-500 hover:text-slate-950 relative">
                      <span
                        className={
                          cartItemsCount
                            ? "absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-emerald-600 rounded-full "
                            : "hidden"
                        }
                      >
                        {cartItemsCount}
                      </span>
                    </i>
                  </Link>
                  <span
                    onClick={signOut}
                    className="text-sm cursor-pointer m-2 transition-all duration-500 hover:bg-red-500 hover:rounded-lg hover:text-white hover:p-2 "
                  >
                    SignOut
                  </span>
                </div>
              ) : null}
            </div>
            <button
              onClick={toggleMenu}
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center mt-3 justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`${
              isMenuOpen ? "max-h-screen" : "max-h-0 md:max-h-none"
            } overflow-hidden transition-all duration-700 ease-in-out items-center justify-between w-full md:flex md:w-auto md:order-1`}
            id="navbar-sticky"
          >
            {userLogin != null ? (
              <ul className="flex flex-col p-4 md:p-0 mt-4 mx-5 text-gray-500 text-left font-medium border border-gray-200 rounded-lg bg-slate-200 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 transition-all duration-500 ">
                <li className="my-2">
                  {" "}
                  <NavLink
                    to=""
                    className="hover:text-emerald-600 transition-all duration-500"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="my-2">
                  {" "}
                  <NavLink
                    to="cart"
                    className="hover:text-emerald-600 transition-all duration-500"
                  >
                    Cart
                  </NavLink>
                </li>
                <li className="my-2">
                  {" "}
                  <NavLink
                    to="wishlist"
                    className="hover:text-emerald-600 transition-all duration-500"
                  >
                    Wish List
                  </NavLink>
                </li>
                <li className="my-2">
                  {" "}
                  <NavLink
                    to="categories"
                    className="hover:text-emerald-600 transition-all duration-500"
                  >
                    Categories
                  </NavLink>
                </li>
                <li className="my-2">
                  {" "}
                  <NavLink
                    to="products"
                    className="hover:text-emerald-600 transition-all duration-500"
                  >
                    Products
                  </NavLink>
                </li>
                <li className="my-2">
                  {" "}
                  <NavLink
                    to="brands"
                    className="hover:text-emerald-600 transition-all duration-500"
                  >
                    Brands
                  </NavLink>
                </li>
              </ul>
            ) : null}
          </div>
        </div>
      </nav>
    </>
  );
}
