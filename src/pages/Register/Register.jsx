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
        setisLoading(false);
      });
  }

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
      .required("re enter same password is required"),
  });
  
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: HandleRegister,
  });

  return (
    <>
      <Helmet>
        <title>SignUp</title>
      </Helmet>
      
      {/* Animated Background */}
      <div className="min-h-screen relative overflow-hidden">
        {/* Animated Mesh Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
        
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4 py-8">
          <div className="w-full max-w-md">
            {/* Glassmorphism Card */}
            <div className=" relative">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full shadow-lg mb-4 animate-bounce">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                  </svg>
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-300 to-emerald-600 bg-clip-text text-transparent mb-2">
                  Create Account
                </h2>
              </div>

              {/* Error Message */}
              {apiError && (
                <div className="mb-6 p-4 rounded-2xl bg-red-500/20 border border-red-300/30 backdrop-blur-sm animate-slideDown">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span className="text-red-500 font-medium">{apiError}</span>
                  </div>
                </div>
              )}

              <form onSubmit={formik.handleSubmit} className="space-y-5">
                {/* Name Field */}
                <div className="group">
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                      className="peer w-full px-4 py-4 bg-white/5 border-2 border-emerald-100 rounded-2xl text-emerald-500 placeholder-transparent focus:border-emerald-400 transition-all duration-300 focus:outline-none focus:ring-transparent"
                      placeholder="Enter Your Name"
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-4 -top-2.5 px-2 text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-400 rounded-lg transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:left-4 peer-focus:text-sm peer-focus:text-emerald-300 peer-focus:bg-gradient-to-r peer-focus:from-emerald-900 peer-focus:to-teal-800"
                    >
                      Enter Your Name
                    </label>
                    <div className="absolute right-4 top-1/4">
                      <svg className="w-5 h-5 text-white/40 group-hover:text-emerald-400  transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                    </div>
                  </div>
                  {formik.errors.name && formik.touched.name && (
                    <div className="mt-2 px-4 text-left">
                      <span className="text-red-500 text-sm font-medium">{formik.errors.name}</span>
                    </div>
                  )}
                </div>

                {/* Email Field */}
                <div className="group">
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      className="peer w-full px-4 py-4 bg-white/5 border-2 border-emerald-100 rounded-2xl text-emerald-500 placeholder-transparent focus:border-emerald-400 transition-all duration-300 focus:outline-none focus:ring-transparent"
                      placeholder="Enter Your Email"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-4 -top-2.5 px-2 text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-400 rounded-lg transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:left-4 peer-focus:text-sm peer-focus:text-emerald-300 peer-focus:bg-gradient-to-r peer-focus:from-emerald-900 peer-focus:to-teal-800"
                    >
                      Enter Your Email
                    </label>
                    <div className="absolute right-4 top-1/4">
                      <svg className="w-5 h-5 text-white/40 group-hover:text-emerald-400  transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                      </svg>
                    </div>
                  </div>
                  {formik.errors.email && formik.touched.email && (
                    <div className="mt-2 px-4 text-left">
                      <span className="text-red-500 text-sm font-medium">{formik.errors.email}</span>
                    </div>
                  )}
                </div>

                {/* Phone Field */}
                <div className="group">
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.phone}
                      className="peer w-full px-4 py-4 bg-white/5 border-2 border-emerald-100 rounded-2xl text-emerald-500 placeholder-transparent focus:border-emerald-400 transition-all duration-300 focus:outline-none focus:ring-transparent"
                      placeholder="Enter Your Phone"
                    />
                    <label
                      htmlFor="phone"
                      className="absolute left-4 -top-2.5 px-2 text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-400 rounded-lg transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:left-4 peer-focus:text-sm peer-focus:text-emerald-300 peer-focus:bg-gradient-to-r peer-focus:from-emerald-900 peer-focus:to-teal-800"
                    >
                      Enter Your Phone
                    </label>
                    <div className="absolute right-4 top-1/4">
                      <svg className="w-5 h-5 text-white/40 group-hover:text-emerald-400  transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </div>
                  </div>
                  {formik.errors.phone && formik.touched.phone && (
                    <div className="mt-2 px-4 text-left">
                      <span className="text-red-500 text-sm font-medium">{formik.errors.phone}</span>
                    </div>
                  )}
                </div>

                {/* Password Field */}
                <div className="group">
                  <div className="relative">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      className="peer w-full px-4 py-4 bg-white/5 border-2 border-emerald-100 rounded-2xl text-emerald-500 placeholder-transparent focus:border-emerald-400 transition-all duration-300 focus:outline-none focus:ring-transparent"
                      placeholder="Enter Your Password"
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-4 -top-2.5 px-2 text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-400 rounded-lg transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:left-4 peer-focus:text-sm peer-focus:text-emerald-300 peer-focus:bg-gradient-to-r peer-focus:from-emerald-900 peer-focus:to-teal-800"
                    >
                      Enter Your password
                    </label>
                    <div className="absolute right-4 top-1/4">
                      <svg className="w-5 h-5 text-white/40 group-hover:text-emerald-400  transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                      </svg>
                    </div>
                  </div>
                  {formik.errors.password && formik.touched.password && (
                    <div className="mt-2 px-4 text-left">
                      <span className="text-red-500 text-sm font-medium">{formik.errors.password}</span>
                    </div>
                  )}
                </div>

                {/* Re-Password Field */}
                <div className="group">
                  <div className="relative">
                    <input
                      type="password"
                      name="rePassword"
                      id="rePassword"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.rePassword}
                      className="peer w-full px-4 py-4 bg-white/5 border-2 border-emerald-100 rounded-2xl text-emerald-500 placeholder-transparent focus:border-emerald-400 transition-all duration-300 focus:outline-none focus:ring-transparent"
                      placeholder="Re enter Your password"
                    />
                    <label
                      htmlFor="rePassword"
                      className="absolute left-4 -top-2.5 px-2 text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-400 rounded-lg transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:left-4 peer-focus:text-sm peer-focus:text-emerald-300 peer-focus:bg-gradient-to-r peer-focus:from-emerald-900 peer-focus:to-teal-800"
                    >
                      Re enter Your password
                    </label>
                    <div className="absolute right-4 top-1/4">
                      <svg className="w-5 h-5 text-white/40 group-hover:text-emerald-400  transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                  </div>
                  {formik.errors.rePassword && formik.touched.rePassword && (
                    <div className="mt-2 px-4 text-left">
                      <span className="text-red-500 text-sm font-medium">{formik.errors.rePassword}</span>
                    </div>
                  )}
                </div>

                {/* Submit Button and Link */}
                <div className="flex flex-col justify-center gap-3 items-center">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-bold rounded-2xl shadow-sm transform transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/25 focus:outline-none focus:ring-4 focus:ring-emerald-300/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group overflow-hidden relative"
                    >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <span className="relative flex items-center justify-center">
                      {isLoading ? (
                        <i className="fas fa-spinner fa-spin text-white text-2xl"></i>
                      ) : (
                        <>
                          <span>Sign up</span>
                          <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                          </svg>
                        </>
                      )}
                    </span>
                  </button>
                  
                  <Link 
                    to="/login"
                    className="inline-block text-nowrap text-emerald-300 hover:text-emerald-400 transition-colors duration-300 font-medium hover:underline"
                  >
                    do you have an account already?
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}