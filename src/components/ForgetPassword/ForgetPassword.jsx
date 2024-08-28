import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function ForgetPassword() {
  const [inputValue, setinputValue] = useState("");
  const [inputValue2, setinputValue2] = useState("");
  const [loading, setloading] = useState(false);
  const [emailSent, setemailSent] = useState(false);
  const [codeSent, setcodeSent] = useState(false);
  let { setuserLogin } = useContext(UserContext);
  let Navigate = useNavigate();
  function handleInputChanges(e) {
    setinputValue(e.target.value);
  }
  function handleInputChanges2(e) {
    setinputValue2(e.target.value);
  }
  async function handleForgetPassword() {
    setloading(true);
    let res = await axios
      .post(
        `https:ecommerce.routemisr.com/api/v1/auth/forgotPasswords
     `,
        { email: inputValue }
      )
      .then((res) => res)
      .catch((res) => res);
    console.log(res);

    if (res.data?.statusMsg == "success") {
      setloading(false);
      setemailSent(true);
      setinputValue("");
      toast.success(res.data.message);
    } else if (res.data?.statusMsg == "fail") {
      setloading(false);
      toast.error(res.data.message);
    }
    if (res.code == "ERR_BAD_REQUEST") {
      setloading(false);
      toast.error(res.message);
    }
  }

  async function handleCode() {
    setloading(true);
    console.log(inputValue);

    let res = await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode
     `,
        { resetCode: inputValue }
      )
      .then((res) => res)
      .catch((res) => res);
    console.log(res);

    if (res.data?.status == "Success") {
      setloading(false);
      setcodeSent(true);
      setinputValue("");
      toast.success("send Successed");
    } else if (res.data?.status == "fail") {
      setloading(false);
      toast.error("Send Failed");
    }
    if (res.code == "ERR_BAD_REQUEST") {
      setloading(false);
      toast.error(`Incorrect Code, ${res.message}`);
    }
  }
  async function handleResetPassword() {
    setloading(true);

    let res = await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/auth/resetPassword
     `,
        { email: inputValue, newPassword: inputValue2 }
      )
      .then((res) => res)
      .catch((res) => res);
    console.log(res);
    if (res.status == 200) {
      setloading(false);
      toast.success("Password Reset Successed");
      localStorage.setItem("userToken", res.data.token);
      setuserLogin(res.data.token);
      Navigate("/");
    } else {
      setloading(false);
      toast.error("Password Reset Failed");
    }

    // if (res.data?.status == "Success") {
    //   setloading(false);
    //   setcodeSent(true);
    //   setinputValue("");
    //   toast.success("send Successed");
    // } else if (res.data?.status == "fail") {
    //   setloading(false);
    //   toast.error("Send Failed");
    // }
    // if (res.code == "ERR_BAD_REQUEST") {
    //   setloading(false);
    //   toast.error(`Incorrect Code, ${res.message}`);
    // }
  }
  return (
    <>
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

      {!emailSent ? (
        <div className="w-[65%] m-auto flex justify-center items-center flex-col">
          <h1 className="my-10 text-3xl text-emerald-700 ">
            Enter Your Email:
          </h1>
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={inputValue}
              onChange={(e) => {
                handleInputChanges(e);
              }}
              type="email"
              name="email"
              id="email"
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
          <button
            onClick={() => {
              handleForgetPassword();
            }}
            className="my-3  px-8 py-2 outline-1 rounded-lg border border-emerald-500 text-emerald-800 transition-all duration-300 hover:bg-emerald-600 hover:text-emerald-50 hover:border-emerald-300"
          >
            Verify
          </button>
        </div>
      ) : !codeSent ? (
        <div className="w-[65%] m-auto flex justify-center items-center flex-col">
          <h1 className="my-10 text-3xl text-emerald-700 ">
            Enter Your Verfication Code:
          </h1>
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={inputValue}
              onChange={(e) => {
                handleInputChanges(e);
              }}
              type="text"
              name="Code"
              id="Code"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="Code"
              className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Code
            </label>
          </div>
          <button
            onClick={() => {
              handleCode();
            }}
            className="my-3  px-8 py-2 outline-1 rounded-lg border border-emerald-500 text-emerald-800 transition-all duration-300 hover:bg-emerald-600 hover:text-emerald-50 hover:border-emerald-300"
          >
            Verify
          </button>
        </div>
      ) : (
        <div className="w-[65%] m-auto flex justify-center items-center flex-col">
          <h1 className="my-10 text-3xl text-emerald-700">
            Fill To Reset Your Password:
          </h1>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => {
                handleInputChanges(e);
              }}
              value={inputValue}
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

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => {
                handleInputChanges2(e);
              }}
              value={inputValue2}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="password"
              className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your New password
            </label>
          </div>

          <button
            onClick={handleResetPassword}
            type="submit"
            className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
          >
            Reset Password
          </button>
        </div>
      )}
    </>
  );
}
