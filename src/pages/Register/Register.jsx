import React, { useContext, useState } from "react";
import style from "./Register.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";
import { Helmet } from "react-helmet-async";

export default function Register() {
  let { userLogin, setuserLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const [apiError, setapiError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  function HandleRegister(values) {
    setisLoading(true);
    // formik send object with inputs values to it
    console.log(values);
    //call api
    let { data } = axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .then((res) => {
        if (res.data.message == "success") {
          localStorage.setItem("userToken", res.data.token);
          setuserLogin(res.data.token);
          navigate("/");
        }
        setisLoading(false);
      })
      .catch((res) => {
        setapiError(res.response.data.message);
        //console.log(res.response.data.message);
        setisLoading(false);
      });
  }

  //Custom Validation
  // function inputsValidation(values) {
  //   //formik send inputsvalues object to it
  //   let errors = {};
  //   if (!values.name) {
  //     // if(values.name=="")
  //     errors.name = "name is required";
  //   } else if (!/^[A-z][a-z]{3}$/.test(values.name)) {
  //     errors.name = "not valid name";
  //   }

  //   if (!values.phone) {
  //     errors.phone = "phone is required";
  //   } else if (!/^01[0125][0-9]{8}$/.test(values.phone)) {
  //     errors.phone = "not valid phone number";
  //   }

  //   return errors;
  // }

  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "min length is 3")
      .max(20, "max length is 20")
      .required("name is required "),
    email: Yup.string().email("invalid email").required("email is required "),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "invalid phone number")
      .required("phone is required "),
    password: Yup.string().matches(
      /^[A-Za-z0-9]{6,15}$/,
      "password should be between 6 to 10 chars"
    ),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "rePassword didnt matches password")
      .required("rePassword is required"),
  });
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    //validate: inputsValidation, // validate take fun that will make validations and this will run before onsubmit lw not valid onsubmit wont run
    validationSchema, //validationSchema:validationSchema,
    onSubmit: HandleRegister,
  });

  return (
    <>
      <Helmet>
        <title>SignUp</title>
      </Helmet>
      {apiError ? (
        <div
          className="mx-auto my-4 w-1/2 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="font-medium">{apiError}</span>
        </div>
      ) : null}
      <div className="my-8">
        <h2 className="font-bold text-emerald-600 text-2xl mb-3">
          Register Now
        </h2>
        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="name"
              id="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="name"
              className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your Name
            </label>
          </div>
          {formik.errors.name && formik.touched.name ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{formik.errors.name}</span>
            </div>
          ) : null}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your Email
            </label>
          </div>
          {formik.errors.email && formik.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{formik.errors.email}</span>
            </div>
          ) : null}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="tel"
              name="phone"
              id="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="phone"
              className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your Phone
            </label>
          </div>
          {formik.errors.phone && formik.touched.phone ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{formik.errors.phone}</span>
            </div>
          ) : null}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="password"
              id="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="password"
              className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your password
            </label>
          </div>
          {formik.errors.password && formik.touched.password ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{formik.errors.password}</span>
            </div>
          ) : null}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="rePassword"
              id="rePassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.rePassword}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="rePassword"
              className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              ReEnter Your password
            </label>
          </div>
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{formik.errors.rePassword}</span>
            </div>
          ) : null}

          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
            >
              {isLoading ? (
                <i className="fas fa-spinner fa-spin text-white text-2xl"></i>
              ) : (
                "signUp"
              )}
            </button>
            <Link to="/login">
              {" "}
              <span className="text-blue-500 underline mx-2">
                do you have an account already?
              </span>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
