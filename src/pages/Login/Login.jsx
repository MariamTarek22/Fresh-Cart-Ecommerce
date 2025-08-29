import { useContext, useState } from "react";
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
    //call api
    let { data } = axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .then((res) => {
        setisLoading(false);
        if (res.data.message == "success") {
          localStorage.setItem("userToken", res.data.token);
          setuserLogin(res.data.token);
          console.log("userLogin",res.data.token);
          
          navigate("/");
        }
      })
      .catch((res) => {
        setisLoading(false);
        setapiError(res.response.data.message);
      });
  }

  let validationSchema = Yup.object().shape({
    email: Yup.string().email("invalid email").required("Email is required "),
    password: Yup.string().matches(
      /^[A-Za-z0-9]{6,15}$/,
      "Password should be between 6 to 10 chars"
    ),
  });
  
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: HandleLogin,
  });

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      
      <div className="min-h-screen relative overflow-hidden">
        
        <div className="relative z-10 mt-10 flex items-start justify-center min-h-screen p-4 ">
          <div className="w-full max-w-md ">
            {/* Glassmorphism Card */}
            <div className="  relative">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full shadow-lg mb-4 animate-bounce">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                  </svg>
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-300 to-emerald-600 bg-clip-text text-transparent mb-2">
                Sign in to Your Account               
                </h2>
              </div>

              {/* Error Message */}
              {apiError && (
                <div className="mb-6 p-4 rounded-2xl bg-red-500/20 border border-red-300/30 backdrop-blur-sm animate-pulse">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span className="text-red-500 font-medium">{apiError}</span>
                  </div>
                </div>
              )}

              <form onSubmit={formik.handleSubmit} className="space-y-6">
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
                    <div className="absolute right-4 top-4">
                      <svg className="w-5 h-5 text-white/40 group-hover:text-emerald-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                      </svg>
                    </div>
                  </div>
                  {formik.errors.email && formik.touched.email && (
                    <div className="mt-2 px-4 text-left">
                      <span className="text-red-500 text-xs font-medium">{formik.errors.email}</span>
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
                      Enter Your Password
                    </label>
                    <div className="absolute right-4 top-4">
                      <svg className="w-5 h-5 text-white/40 group-hover:text-emerald-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                      </svg>
                    </div>
                  </div>
                  {formik.errors.password && formik.touched.password && (
                    <div className="mt-2 px-4 text-left">
                      <span className="text-red-500 text-xs font-medium">{formik.errors.password}</span>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
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
                        <span>Login</span>
                        <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                        </svg>
                      </>
                    )}
                  </span>
                </button>

                {/* Links */}
                <div className="text-center space-y-4">
                  <Link 
                    to="/forgetPassword"
                    className="inline-block text-emerald-300 hover:text-emerald-400 transition-colors duration-300 font-medium hover:underline"
                  >
                    Forgot your password?
                  </Link>
                  
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-emerald-400">Don't have an account?</span>
                    <Link 
                      to="/register"
                      className=" text-emerald-300 hover:text-emerald-400 transition-colors duration-300 font-bold hover:underline"
                    >
                      Sign up now
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}