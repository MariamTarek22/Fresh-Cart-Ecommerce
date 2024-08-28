import React, { useContext, useState } from "react";
import style from "./Login.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";
import { Helmet } from "react-helmet-async";

export default function Login() {
  const navigate = useNavigate();
  const [apiError, setapiError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  let { userLogin, setuserLogin } = useContext(UserContext);

  function HandleLogin(values) {
    setisLoading(true);
    // formik send object with inputs values to it
    console.log(values);
    //call api
    let { data } = axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .then((res) => {
        setisLoading(false);
        if (res.data.message == "success") {
          localStorage.setItem("userToken", res.data.token);
          setuserLogin(res.data.token);
          navigate("/");
        }
      })
      .catch((res) => {
        setisLoading(false);
        setapiError(res.response.data.message);
        //console.log(res.response.data.message);
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
    email: Yup.string().email("invalid email").required("email is required "),
    password: Yup.string().matches(
      /^[A-Za-z0-9]{6,15}$/,
      "password should be between 6 to 10 chars"
    ),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    //validate: inputsValidation, // validate take fun that will make validations and this will run before onsubmit lw not valid onsubmit wont run
    validationSchema, //validationSchema:validationSchema,
    onSubmit: HandleLogin,
  });

  return (
    <>
      <Helmet>
        <title>Login</title>
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
        <h2 className="font-bold text-emerald-600 text-2xl mb-3">Login Now</h2>
        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
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

          <div className="flex justify-between items-center mb-5">
            <button
              type="submit"
              className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
            >
              {isLoading ? (
                <i className="fas fa-spinner fa-spin text-white text-2xl"></i>
              ) : (
                "Login"
              )}
            </button>

            <Link to="/forgetPassword">
              {" "}
              <span className="text-red-500 transition-all duration-500 hover:underline mx-2">
                {"Forget Your Password?"}
              </span>
            </Link>
          </div>
          <Link to="/register">
            {" "}
            <span className="text-blue-500 transition-all duration-500 hover:underline mx-2">
              {" don't you have an account?"}
            </span>
          </Link>
        </form>
      </div>
    </>
  );
}
