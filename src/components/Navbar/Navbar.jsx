import { useContext, useState } from "react";
import logo from "../../assets/logo.svg";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  const [isMenuOpen, setisMenuOpen] = useState(false);
  let Navigate = useNavigate();
  let { userLogin, setuserLogin } = useContext(UserContext);
  let { cartItemsCount } = useContext(CartContext);

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
      <nav className="border-gray-100 bg-slate-100 dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b  dark:border-gray-600">
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
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse md:w-1/4 lg:w-1/6 w-auto items-center">
            <div className="links flex gap-2 justify-between items-center w-full">
              {userLogin ? null : (
                <>
                  <Link
                    to="login"
                    className="text-nowrap w-1/2 py-2 px-4 text-center bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-bold rounded-lg shadow-sm transform transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/25 focus:outline-none focus:ring-4 focus:ring-emerald-300/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group overflow-hidden relative"
                  >
                    Login
                  </Link>
                  <Link
                    to="register"
                    className="text-nowrap w-1/2 py-2 px-4 text-center bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-bold rounded-lg shadow-sm transform transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/25 focus:outline-none focus:ring-4 focus:ring-emerald-300/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group overflow-hidden relative"
                  >
                    Sign up
                  </Link>
                </>
              )}
              {userLogin ? (
                <div className=" flex items-center gap-4 justify-center">
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
                  <button
                    onClick={signOut}
                    className="group text-nowrap relative inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm transition-all duration-300 hover:bg-red-50 hover:border-red-300 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:scale-95"
                  >
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Sign out
                  </button>
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
              <ul className="flex flex-col p-4 md:p-0 mt-4 mx-5 text-gray-500 text-left font-medium border border-gray-200 rounded-lg bg-slate-100 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 transition-all duration-500 ">
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
