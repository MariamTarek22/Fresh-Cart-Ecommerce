import React, { useContext, useState } from "react";
import style from "./CheckOut.module.css";
import { useFormik } from "formik";
import { Helmet } from "react-helmet-async";
import { CartContext } from "../../Context/CartContext";
import * as Yup from "yup";
import toast from "react-hot-toast";

export default function CheckOut() {
  const [Loading, setLoading] = useState(false);
  const [paymentType, setpaymentType] = useState("card");
  let { checkOutWithCard, cartId } = useContext(CartContext);
  let validationSchema = Yup.object().shape({
    Details: Yup.string()
      .matches(/^[A-Za-z0-9]{5,}$/, "Details must be 5 charachters or above")
      .required("Details is required "),
    City: Yup.string()
      .matches(/^[A-Za-z0-9]{5,}$/, "City must be 5 charachters or above")
      .required("City is required "),
    Phone: Yup.string().matches(/^01[1250][0-9]{8}$/, "Invalid Phone Number"),
  });
  let formik = useFormik({
    initialValues: {
      Details: "",
      Phone: "",
      City: "",
    },
    validationSchema,
    onSubmit: () => {
      HandleCheckOut(cartId, `http://localhost:5173`);
    },
  });
  async function HandleCheckOut(cartId, url) {
    setLoading(true);
    let { data } = await checkOutWithCard(cartId, url, formik.values);
    console.log(data);
    if (data?.status == "success") {
      setLoading(false);
      window.location.href = data.session.url;
    } else {
      setLoading(false);
      toast.error("An issue happened while making your order");
    }
  }

  return (
    <>
      <Helmet>
        <title>CheckOut</title>
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

      <div className="my-8">
        <h2 className="font-bold text-emerald-600 text-2xl mb-5">
          CheckOut Now
        </h2>
        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="Details"
              id="Details"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Details}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="Details"
              className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your Details
            </label>
          </div>

          {formik.errors.Details && formik.touched.Details ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{formik.errors.Details}</span>
            </div>
          ) : null}

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="tel"
              name="Phone"
              id="Phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Phone}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="Phone"
              className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your Phone
            </label>
          </div>

          {formik.errors.Phone && formik.touched.Phone ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{formik.errors.Phone}</span>
            </div>
          ) : null}

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="City"
              id="City"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.City}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="City"
              className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your City
            </label>
          </div>
          {formik.errors.City && formik.touched.City ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{formik.errors.City}</span>
            </div>
          ) : null}

          <div className="flex my-5">
            <div className="flex items-center me-4">
              <input
                onClick={() => {
                  setpaymentType("cash");
                }}
                id="inline-radio"
                type="radio"
                defaultValue
                name="inline-radio-group"
                className="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 focus:ring-emerald-500 dark:focus:ring-emerald-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="inline-radio"
                className="ms-2 text-sm font-medium text-emerald-900 dark:text-emerald-300"
              >
                Cash On Delivery
              </label>
            </div>
            <div className="flex items-center me-4">
              <input
                onClick={() => {
                  setpaymentType("card");
                }}
                id="inline-2-radio"
                type="radio"
                defaultValue
                defaultChecked
                name="inline-radio-group"
                className="w-4 h-4 text-emerald-600 bg-emerald-100 border-emerald-300 focus:ring-emerald-500 dark:focus:ring-emerald-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="inline-2-radio"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Pay With Card
              </label>
            </div>
          </div>

          <div className="flex justify-between items-center mb-5">
            {paymentType == "card" ? (
              <button
                type="submit"
                className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
              >
                Pay With Card
              </button>
            ) : paymentType == "cash" ? (
              <h3 className=" text-red-800  font-semibold">
                <span>Currently Not Valid Process Change to card</span>
              </h3>
            ) : null}
          </div>
        </form>
      </div>
    </>
  );
}
