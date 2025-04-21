/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import { WishListContext } from "../../Context/WishListContext";
import { CartContext } from "../../Context/CartContext";
import { useContext ,useState} from "react";
import toast from "react-hot-toast";
import { UserContext } from "../../Context/UserContext";
import RatingStars from "../RatingStars/RatingStars";

export default function ProductCard({product}) {
    const navigate = useNavigate()
    let { userLogin } = useContext(UserContext);
    let { addProductToCart, setaddProductLoading, setcartItemsCount } = useContext(CartContext);
    let { addProductToWishList, removeWishListItem, wishList, setWishList } = useContext(WishListContext);
    const [AddToWishListLoading, setAddToWishListLoading] = useState(false);

    function scrollUp() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
       
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
        if(!userLogin){
            scrollUp();
            navigate("/login");
            return;
        }
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
      async function addToWishList(id) {
        let res = await addProductToWishList(id);
        if (res.data.status == "success") {
         setWishList(res.data.data);
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
      async function removeFromWishList(id) {
        let res = await removeWishListItem(id);
        if (res.data.status == "success") {
          setWishList(res.data.data);
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

      function HandleAddToWishList(id) {
        if(!userLogin){
            scrollUp();
            navigate("/login");
            return;
        }
        setAddToWishListLoading(true);
        let productFound = wishList.find((productId) => productId == id);
        if (productFound) {
          removeFromWishList(id);
        } else {
          addToWishList(id);
        }
      }

      function handleNaigationToDetails(category,id){
        scrollUp();
        if(!userLogin){
            navigate("/login");
            return;
        }
        navigate(`/productDetails/${category}/${id}`);         
      }
  return (
  <>
  <div
        className={
          AddToWishListLoading
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
    <div key={product.id} className="w-full lg:w-1/4 md:w-1/3 cursor-pointer">
    <div className="product p-5">
      <div onClick={()=>handleNaigationToDetails(product.category.name,product.id)}>
          <div className="w-full h-full relative">
          <img
            src={product.imageCover}
            className="w-full"
            alt=""
          />
          {product.priceAfterDiscount? <span className="bg-red-400 text-white font-medium absolute top-3 left-4 px-2 py-1 rounded-full">Sale</span>: ''}
          <RatingStars productRate={product.ratingsAverage} />
          </div>
          <h3 className=" text-emerald-600">
            {product.category.name}
          </h3>
          <h3 className="mb-2 font-semibold">
            {product.title.split(" ").slice(0, 2).join(" ")}
          </h3>
          <div className="flex justify-between p-3">
            <span className={product.priceAfterDiscount? 'line-through text-red-600': 'text-slate-900 no-underline font-semibold'}>{product.price} EGP</span>
            {product.priceAfterDiscount? 
            <span className="text-slate-900 font-semibold">{product.priceAfterDiscount} EGP</span> : ' '}
          </div>
      </div>
    
      <div className="flex">
        <button
          onClick={() => addToCart(product.id)}
          className="btn"
        >
          <i className="fa-solid fa-plus"></i> Add to Cart
        </button>
        <span
          onClick={() => HandleAddToWishList(product.id)}
          className="cursor-pointer"
        >
          <i
            className={
              wishList.find(
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
  </>
  )
}
