import { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { WishListContext } from "../../Context/WishListContext";
import Notfound from "../../pages/Notfound/Notfound";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
import ProductCard from "../ProductCard/ProductCard";

export default function RecentProducts() {

  let { userLogin, setuserLogin } = useContext(UserContext);

  //let { data, error, isError, isLoading } = useProducts();
  const [AllProducts, setAllProducts] = useState("");
  const productsRef = useRef(null);

  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`, {
      // params: { page, limit: 12 }, // Modify based on your API
    });
  }
  let productsInfo = useQuery({
    queryKey: ["recentProducts"], // Include page in queryKey for refetching ["recentProducts",page]
    queryFn: () => getProducts(), //getProducts(page)
    keepPreviousData: true, // Keeps previous data while fetching new page
  });
  let { data, error, isError, isLoading } = productsInfo;

  const [wishListLoadding, setWishListLoadding ] = useState(false);
  const [loadingGetWishListItems, setloadingGetWishListItems] = useState(false);
  const [InputValue, setInputValue] = useState([]);
  let { getLoggedWishList ,setWishList } = useContext(WishListContext);

  async function getWishListItems() {
    setWishListLoadding(true)
    let response = await getLoggedWishList();
    if (response?.data?.status == "success") {
      let wishlistProductsIds = response.data.data.map((product) => product.id);
      setWishList(wishlistProductsIds);
      setloadingGetWishListItems(true);
    }
    if (response?.response?.status == 404) {
      setWishListLoadding(false);
    }
  }

  function handleInputChange(e) {
    const newValue = e.target.value;
    setInputValue(newValue);
    filterProducts(newValue);
  }
  function filterProducts(value) {
    if (value == "") {
      setAllProducts(data.data.data);
    } else {
      let filteredProducts = data.data.data.filter((product) =>
        product.title.toLowerCase().includes(value.toLowerCase())
      ); // if i made it filter with allProducts state when i go backspace it will search of allproducts array which is not allproducts it is the last seached items
      setAllProducts(filteredProducts);
    }
  }

  useEffect(() => {
    setAllProducts(data?.data?.data);
  }, [data?.data?.data]);

  useEffect(() => {
    if (userLogin) {
      getWishListItems();
    } 
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
      {/* search input */}
      <div className="max-w-md mx-auto mt-14" ref={productsRef}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            value={InputValue}
            onChange={handleInputChange}
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
            placeholder="Search Products By Title ..."
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
          >
            Search
          </button>
        </div>
      </div>

      {/* products rendering */}
        <div className="row w-full">
           { AllProducts?.length>0 ? AllProducts?.map((product) => {
                return <ProductCard product={product} key={product.id} />
              }): <h2>No Products found</h2>}
          </div>
    </>
  );
}
