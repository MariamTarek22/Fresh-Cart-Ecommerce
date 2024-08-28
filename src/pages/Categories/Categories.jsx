import React, { useState } from "react";
import style from "./Categories.module.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Notfound from "../Notfound/Notfound";


export default function Categories() {
  const [subCategories, setsubCategories] = useState([]);
  const [category, setcategory] = useState();
  const [Loading, setLoading] = useState(false);
  let Navigate = useNavigate();
  async function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }
  async function getSubCategories(categoryId, categoryName) {
    setLoading(true);
    setcategory(categoryName);
    let res = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`
    );
    console.log(res.data.data);
    setsubCategories(res.data.data);
    setLoading(false);
    scrollDown();
  }
  let { data, error, isError, isLoading, isFetching } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    // staleTime:10000,
  });
  function scrollDown() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }
  if (isError) {
    return <Notfound error={error.message} />;
  }
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gray-100 bg-opacity-40 z-10 flex items-center ">
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
    );
  }
  return (
    <>
      <Helmet>
        <title>Categories</title>
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
      <div className="row mt-5">
        {data?.data?.data.map((category) => {
          return (
            <div key={category._id} className="w-full md:w-1/3 p-3">
              <div
                onClick={() => {
                  getSubCategories(category._id, category.name);
                }}
                className="category border-2"
              >
                {/* <Link to={`/CategoryProducts/${category.name}`}> */}
                <img
                  src={category.image}
                  className=" h-[250px] w-full object-cover mb-2"
                  alt=""
                />
                <h3 className=" text-emerald-600 text-2xl my-4 font-semibold">
                  {category.name}
                </h3>
                {/* </Link> */}
              </div>
            </div>
          );
        })}
      </div>

      {subCategories.length > 0 ? (
        <div>
          <h2 className="text-center text-emerald-700 text-2xl font-semibold ">
            {category} SubCategories
          </h2>
          <div className="row mt-5  ">
            {subCategories?.map((category) => {
              return (
                <div className="w-full md:w-1/3 p-2 " key={category._id}>
                  <p className=" subcategory text-center text-xl font-semibold  border-2 border-gray-200 rounded-md px-4 py-3">
                    {category.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </>
  );
}
