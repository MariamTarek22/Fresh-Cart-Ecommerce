import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();
export default function CartContextProvider(props) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };
  const [addProductLoading, setaddProductLoading] = useState(false);

  const [cartItemsCount, setcartItemsCount] = useState(0);
  const [cartId, setcartId] = useState("");

  async function addProductToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: productId,
        },
        {
          headers: headers,
        }
      )
      .then((res) => {
        setcartItemsCount(res.data.numOfCartItems);
        return res;
      })
      .catch((err) => err);
  }

  async function getLoggedUserCart() {
    return await axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/cart`,

        {
          headers: headers,
        }
      )
      .then((res) => {
        console.log(res);
        setcartItemsCount(res.data.numOfCartItems);
        setcartId(res.data.cartId);
        return res;
      })
      .catch((err) => err);
  }

  async function updateProductQuantity(id, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count: count,
        },
        {
          headers: headers,
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  async function clearCartItems() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }
  async function removeCartItem(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: headers,
      })
      .then((res) => {
        setcartItemsCount(res.data.numOfCartItems);
        return res;
      })
      .catch((err) => err);
  }
  async function checkOutWithCard(cartId, url, formData) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        {
          shippingAddress: formData,
        },
        {
          headers: headers,
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  // async function checkOutWithCash(cartId, formData) {
  //   return axios
  //     .post(
  //       `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
  //       { headers },
  //       { shippingAddress: formData }
  //     )
  //     .then((res) => res)
  //     .catch((err) => err);
  // }
  useEffect(() => {
    getLoggedUserCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        getLoggedUserCart,
        setaddProductLoading,
        addProductLoading,
        updateProductQuantity,
        removeCartItem,
        cartItemsCount,
        setcartItemsCount,
        clearCartItems,
        checkOutWithCard,
        cartId,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
