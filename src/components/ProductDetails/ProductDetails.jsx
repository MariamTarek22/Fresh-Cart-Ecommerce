import React, { useState, useEffect, useContext } from "react";
import style from "./ProductDetails.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishListContext } from "../../Context/WishListContext";
import { Helmet } from "react-helmet-async";

export default function ProductDetails() {
  let { id, category } = useParams(); //get me what i sent in url
  const [proudct, setproudct] = useState(null);
  const [relatedProducts, setrelatedProducts] = useState([]);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  const settingsMain = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    asNavFor: nav2,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
  };
  let { addProductToWishList, getLoggedWishList } = useContext(WishListContext);
  const [Loading, setLoading] = useState(false);

  async function getWishListItems() {
    let response = await getLoggedWishList();
    console.log(response);

    if (response?.data?.status == "success") {
      let wishlistProductsIds = response.data.data.map((product) => product.id);
      setwishlist(wishlistProductsIds);
      setLoading(false);
    }

    if (response?.response?.status == 404) {
      setLoading(false);
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

  const settingsThumbs = {
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: nav1,
    dots: false,
    focusOnSelect: true,
    arrows: false,
  };

  function getProduct() {
    setLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        //console.log(res.data.data);
        setproudct(res.data.data);
        setLoading(false);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  function getRelatedProducts() {
    setLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        setLoading(false);

        //console.log(res.data.data);
        let afterFilter = res.data.data.filter((product) => {
          return product.category.name == category;
        });

        setrelatedProducts(afterFilter);
      })
      .catch((res) => {
        setLoading(false);
        console.log(res);
      });
  }
  //console.log(relatedProducts);
  const [wishlist, setwishlist] = useState([]);

  useEffect(() => {
    getProduct();
    getRelatedProducts();
    getWishListItems();
  }, [id, category]); //why making warningggg?

  useEffect(() => {
    // Any additional logic that needs to happen when wishlist changes
    console.log("Wishlist updated:", wishlist);
  }, [wishlist]);
  function scrollUp() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  let {
    addProductToCart,
    setaddProductLoading,
    addProductLoading,
    setcartItemsCount,
  } = useContext(CartContext);

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

  return (
    <>
      <Helmet>
        <title>Product Details</title>
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

      {proudct ? (
        <>
          <div className="row items-center ">
            <div className="w-full md:w-1/4">
              <Slider
                {...settingsMain}
                asNavFor={nav2}
                ref={(slider) => setNav1(slider)}
                className="my-7"
              >
                {proudct?.images.map((srcc, i) => (
                  <div key={i}>
                    <img src={srcc} alt="" className="w-full" />
                  </div>
                ))}
              </Slider>

              {/* Thumbnail Slider */}
              <Slider
                {...settingsThumbs}
                asNavFor={nav1}
                ref={(slider) => setNav2(slider)}
                className="my-3 flex justify-center"
              >
                {proudct?.images.map((srcc, i) => (
                  <div key={i} aria-hidden="Product-Details-Images">
                    <img src={srcc} alt="" className={style.thumbnailImage} />
                  </div>
                ))}
              </Slider>
            </div>
            <div className="w-full md:w-3/4 p-4 text-left px-7">
              <h3 className="capitalize font-semibold text-2xl">
                {proudct?.title}
              </h3>
              <h4 className="text-gray-700 my-4">{proudct?.description}</h4>
              <h4 className="font-semibold">{proudct?.category.name}</h4>
              <div className=" flex justify-between p-3 my-5">
                <span>{proudct?.price} EGP</span>
                <span>
                  <i className="fas fa-star px-1 text-yellow-300"></i>
                  {proudct?.ratingsAverage}
                </span>
              </div>
              <div className="flex">
                <button
                  onClick={() => addToCart(proudct.id)}
                  className="btn  transition-all duration-500 hover:bg-emerald-400 hover:text-emerald-900 "
                >
                  <i className="fa-solid fa-plus"></i> Add to Cart
                </button>
                <span
                  onClick={() => addToWishList(proudct.id)}
                  className="cursor-pointer"
                >
                  <i
                    className={
                      wishlist.find((productid) => productid == proudct.id)
                        ? "fa-solid fa-heart text-xl my-2 mx-3 text-red-600"
                        : "fa-solid fa-heart text-xl my-2 mx-3"
                    }
                  ></i>
                </span>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {relatedProducts.length > 0 ? (
        <h2 className="font-semibold text-2xl mt-5 mx-5 text-left text-emerald-300">
          Related Products :
        </h2>
      ) : null}
      <div className="row">
        {relatedProducts.length > 0
          ? relatedProducts.map((product) => {
              return (
                <div key={product.id} className="w-full  lg:w-1/4 md:w-1/3">
                  <div className="product p-5 ">
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
                    <div className="flex  ">
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
