import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
export default function AllOrders() {
  const [Orders, setOrders] = useState(null);
  const [loading, setloading] = useState(false);
  async function getUser() {
    setloading(true);
    const token = localStorage.getItem("userToken");
    let res = await axios
      .get(`https://ecommerce.routemisr.com/api/v1/auth/verifyToken`, {
        headers: {
          token,
        },
      })
      .then((res) => res)
      .catch((res) => res);
    console.log(res);
    if (res.data.message == "verified") {
      console.log(res.data.decoded.id);
      getUserOrders(res.data.decoded.id);
    }
  }
  async function getUserOrders(userId) {
    let res = await axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
      .then((res) => res)
      .catch((res) => res);
    console.log(res.data);
    setOrders(res.data);
    setloading(false);
  }
  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
     <Helmet>
        <title>Orders</title>
      </Helmet>
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
      <div className="max-w-6xl mx-auto p-6 mt-10">
        <h2 className="text-3xl font-bold mb-8 text-left text-emerald-800">
          Your Orders
        </h2>

        {Orders?.map((order, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200"
          >
            {/* Order Info */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Order #{order.id}</h3>

              <div className="mb-4">
                <span
                  className={`px-4 py-2 rounded-full text-sm mx-2 ${
                    order.isDelivered === true
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {order.isDelivered ? "Delivered" : " UnDelivered"}
                </span>
                <span
                  className={`px-4 py-2 rounded-full text-sm ${
                    order.isPaid
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {order.isPaid ? "Paid" : "Unpaid"}
                </span>
              </div>
            </div>

            {/* Customer Info */}
            <div className="mb-4 text-left text-yellow-600">
              <p>
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                })}
              </p>
            </div>

            {/* Order Items */}
            <div>
              <h4 className="font-semibold text-lg my-3 text-left  border-b-2 pb-2">
                Items Ordered
              </h4>
              <ul className="space-y-2">
                {order.cartItems.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.product.imageCover}
                        alt={item.product.title}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <p>
                        <span className="text-white bg-red-500 rounded-full py-1 px-2 mx-2 text-xs">
                          {item.count}
                        </span>{" "}
                        {item.product.title.split(" ").slice(0, 2).join(" ")}
                      </p>
                      <div>
                        <p className="text-gray-700">{item.name}</p>
                      </div>
                    </div>
                    <span className="text-lg font-medium text-emerald-600">
                      {item.price} EGP
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Total Price */}
            <div className="flex justify-end mt-4">
              <p className="text-xl font-bold">
                Total: {order.totalOrderPrice} EGP
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
