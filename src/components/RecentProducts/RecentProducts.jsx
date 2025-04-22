import { useContext, useEffect, useState } from "react";
import { WishListContext } from "../../Context/WishListContext";
import Notfound from "../../pages/Notfound/Notfound";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
import ProductCard from "../ProductCard/ProductCard";
import InfiniteScroll from "react-infinite-scroll-component";

export default function RecentProducts() {
  const { userLogin } = useContext(UserContext);
  const { getLoggedWishList, setWishList } = useContext(WishListContext);

  const [AllProducts, setAllProducts] = useState([]);
  const [FilteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [InputValue, setInputValue] = useState("");

  const getProducts = (page) =>
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`, {
      params: { page, limit: 12 },
    });

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["recentProducts", currentPage], // Include page in queryKey for refetching ["recentProducts",page]
    queryFn: () => getProducts(currentPage),  // Keeps previous data while fetching new page
    keepPreviousData: true,
  });

  useEffect(() => {
    if (data?.data?.data) {
      setAllProducts((prev) =>
        currentPage === 1 ? data.data.data : [...prev, ...data.data.data]
      );
      setTotalPages(data.data.metadata.numberOfPages);
    }
  }, [data]);

  useEffect(() => {
    const fetchWishList = async () => {
      let response = await getLoggedWishList();
      if (response?.data?.status === "success") {
        const wishlistProductsIds = response.data.data.map((p) => p.id);
        setWishList(wishlistProductsIds);
      }
    };
    if (userLogin) {
      fetchWishList();
    }
  }, [userLogin]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    filterProducts(newValue);
  };

  const filterProducts = (value) => {
    if (value=="") {
      setFilteredProducts([])
    } else {
      const filtered = AllProducts.filter((product) =>
        product.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(filtered); //use setFilteredProducts(filtered); in separate filter array instead of setAllProducts(filtered); so i can show allproducts when the filter value is empty cause data.data.data holds the last page products only
    }
  };

  if (isError) return <Notfound error={error.message} />;
  if (isLoading && currentPage === 1) 
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
  return (
    <>
        {/* search input */}
        <div className="max-w-md mx-auto mt-14">
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

      {/* Product List */}
      {AllProducts.length > 0 ? (
        <InfiniteScroll
          dataLength={AllProducts.length}
          next={() => setCurrentPage((prev) => prev + 1)}
          hasMore={currentPage < totalPages}
          loader={
            <div className="flex justify-center py-4">
              <span className="infinite-scroll-loader"></span>
            </div>
          }
        >
          <div className="row w-full">
            { 
            InputValue && FilteredProducts.length > 0 ? FilteredProducts.map((product) => (<ProductCard product={product} key={product.id+1} />)) 
            : InputValue ? <h2 className="mx-auto p-10 font-semibold text-2xl">No Products found with the search Value</h2>
             : AllProducts.map((product) => (<ProductCard product={product} key={product.id} />)) }
          </div>
        </InfiniteScroll>
      ) : <h2>No Products Available</h2>}
    </>
  );
}
