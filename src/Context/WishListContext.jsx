import axios from "axios";
import { createContext } from "react";

export let WishListContext = createContext();
export default function WishListContextProvider(props) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  async function addProductToWishList(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId: productId,
        },
        {
          headers: headers,
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  async function getLoggedWishList() {
    return await axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,

        {
          headers: headers,
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  async function removeWishListItem(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers: headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  return (
    <WishListContext.Provider
      value={{ addProductToWishList, getLoggedWishList, removeWishListItem }}
    >
      {props.children}
    </WishListContext.Provider>
  );
}
