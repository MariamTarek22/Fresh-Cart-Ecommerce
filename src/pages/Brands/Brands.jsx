import React, { useState } from "react";
import style from "./Brands.module.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Notfound from "../Notfound/Notfound";
import { Helmet } from "react-helmet-async";
export default function Brands() {
  const [brandDetails, setbrandDetails] = useState(null);
  const [status, setstatus] = useState(false);
  const [loading, setloading] = useState(false);
  async function getBrands() {
    setloading(true);
    let brands = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/brands`
    );
    setloading(false);
    return brands;
  }

  let { data, error, isError, isLoading, isFetching } = useQuery({
    queryKey: ["Brands"],
    queryFn: getBrands,
    // staleTime:10000,
  });
  console.log(data?.data?.data);

  async function getSpecificBrand(brandId) {
    setloading(true);
    let brandDetails = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/brands/${brandId}`
    );
    console.log(brandDetails.data.data);
    setbrandDetails(brandDetails.data.data);
    setloading(false);
    setstatus(true);
  }

  function close() {
    setstatus(false);
  }

  if (isError) {
    return <Notfound error={error.message} />;
  }
  if (isLoading) {
    return (
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
    );
  }
  return (
    <>
      <Helmet>
        <title>Brands</title>
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

      {status ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50"
          onClick={close}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-bold text-green-600">
                {brandDetails.name}
              </h3>
              <button
                onClick={close}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-4 flex justify-center items-center">
              <p className="text-gray-800">{brandDetails.slug}</p>
              <img
                src={brandDetails.image}
                alt="Lenovo Logo"
                className="my-4"
              />
            </div>
            <div className="p-4 border-t flex justify-end">
              <button
                onClick={close}
                className="px-4 py-2 text-white bg-gray-600 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <h1 className="text-4xl text-emerald-600 font-semibold mt-14">
        {" "}
        All Brands
      </h1>
      <div className="row mt-5">
        {data?.data?.data.map((brand) => {
          return (
            <div
              onClick={() => getSpecificBrand(brand._id)}
              key={brand._id}
              className="w-full md:w-1/4  p-2  cursor-pointer"
            >
              <div className="brand px-4 py-6 border-2 flex justify-center items-center ">
                <Link to={``}>
                  <img src={brand.image} className=" h-[200px] w-full" alt="" />
                  <h3 className=" ">{brand.name}</h3>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
