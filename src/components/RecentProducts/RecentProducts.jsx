import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useProducts from "./../../Hooks/useProducts"; //my custom hook
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishListContext } from "../../Context/WishListContext";
import Notfound from "../../pages/Notfound/Notfound";

export default function RecentProducts() {
  const [AllProducts, setAllProducts] = useState([]);
  let { data, error, isError, isLoading } = useProducts();
  const [AddToWishListLoading, setAddToWishListLoading] = useState(false);
  const [loadingGetWishListItems, setloadingGetWishListItems] = useState(false);
  const [wishlist, setwishlist] = useState([]);
  const [InputValue, setInputValue] = useState([]);
  let { addProductToCart, setaddProductLoading, setcartItemsCount } =
    useContext(CartContext);
  let { addProductToWishList, getLoggedWishList } = useContext(WishListContext);

  async function getWishListItems() {
    let response = await getLoggedWishList();

    if (response?.data?.status == "success") {
      let wishlistProductsIds = response.data.data.map((product) => product.id);
      setwishlist(wishlistProductsIds);

      setloadingGetWishListItems(true);
    }

    if (response?.response?.status == 404) {
      setAddToWishListLoading(false);
    }
  }

  async function addToWishList(id) {
    setAddToWishListLoading(true);
    let res = await addProductToWishList(id);
    console.log(res.data);
    if (res.data.status == "success") {
      setwishlist(res.data.data);
      setAddToWishListLoading(false);
      toast.success(res.data.message, {
        position: "top-right",
        style: {
          padding: "10px",
        },
      });
    } else {
      setAddToWishListLoading(false);
      toast.error(res.data.message, {
        position: "top-right",
        style: {
          padding: "10px",
        },
      });
    }
  }

  // async function getCartItemsCount() {
  //   let response = await getLoggedUserCart();
  //   if (response.status == 200) {
  //     setcartItemsCount(response.data.numOfCartItems);
  //   } else {
  //     setcartItemsCount(0);
  //   }
  // }

  const CustomSuccessIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      style={{
        width: "30px",
        height: "30px",
        backgroundColor: "yellowgreen",
        borderRadius: "50%",
      }} // Yellow background
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 13l4 4L19 7"
        stroke="white" // Green checkmark
      />
    </svg>
  );
  const CustomErrorIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      style={{ width: "30px", height: "30px" }}
    >
      <circle cx="12" cy="12" r="10" stroke="red" strokeWidth="2" fill="red" />
      <line x1="8" y1="8" x2="16" y2="16" stroke="white" strokeWidth="2" />
      <line x1="16" y1="8" x2="8" y2="16" stroke="white" strokeWidth="2" />
    </svg>
  );

  async function addToCart(productId) {
    setaddProductLoading(true);
    let response = await addProductToCart(productId);
    if (response.data.status == "success") {
      setaddProductLoading(false);
      toast.success(response.data.message, {
        position: "top-right",
        icon: <CustomSuccessIcon />,
        style: {
          background: "green",
          color: "white",
          padding: "10px",
        },
      });
      setcartItemsCount(response.data.numOfCartItems);
    } else {
      setaddProductLoading(false);
      toast.error(response.data.message, {
        position: "top-right",
        icon: <CustomErrorIcon />,
        style: {
          background: "darkred",
          color: "white",
          padding: "10px",
        },
      });
    }
  }
  function handleInputChange(e) {
    const newValue = e.target.value;
    setInputValue(newValue);
    filterProducts(newValue);
  }
  function filterProducts(value) {
    console.log(value);
    console.log(data.data.data);
    if (value == "") {
      setAllProducts(data.data.data);
    } else {
      let filteredProducts = data.data.data.filter((product) =>
        product.title.toLowerCase().includes(value.toLowerCase())
      ); // if i made it filter with allProducts state when i go backspace it will search of allproducts array which is not allproducts it is the last seached items
      console.log(filteredProducts);
      setAllProducts(filteredProducts);
    }
  }

  useEffect(() => {
    setAllProducts(data?.data?.data);
    console.log(data?.data?.data);
    
  }, [data?.data?.data]);
  useEffect(() => {
    //getCartItemsCount();
    getWishListItems();
  }, []);

  // const [proudcts, setproudcts] = useState([]);
  // function getProducts() {
  //   axios
  //     .get(`https://ecommerce.routemisr.com/api/v1/products`)
  //     .then((res) => {
  //       console.log(res.data.data);
  //       setproudcts(res.data.data);
  //     })
  //     .catch((res) => {
  //       console.log(res);
  //     });
  // }

  // useEffect(() => {
  //   getProducts();
  // }, []);
  function scrollUp() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
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
      <div
        className={
          AddToWishListLoading || !loadingGetWishListItems
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

      <div className="row w-full">
        {loadingGetWishListItems
          ? AllProducts?.map((product) => {
              return (
                <div key={product.id} className="w-full  lg:w-1/4 md:w-1/3">
                  <div className="product p-5">
                    <div onClick={scrollUp}>
                      <Link
                        to={`/productDetails/${product.category.name}/${product.id}`}
                      >
                        <img
                          src={product.imageCover}
                          className="w-full"
                          alt=""
                        />
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
                    </div>

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
                            wishlist.find(
                              (productid) => productid == product.id
                            )
                              ? "fa-solid fa-heart text-xl my-2 mx-3 text-red-600"
                              : "fa-solid fa-heart text-xl my-2 mx-3"
                          }
                        ></i>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </>
  );
}
