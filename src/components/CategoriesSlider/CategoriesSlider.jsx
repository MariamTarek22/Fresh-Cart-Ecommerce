import React, { useEffect, useState } from "react";
import style from "./CategoriesSlider.module.css";
import axios from "axios";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";

export default function CategoriesSlider() {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 3,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows:false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
    pauseOnHover: true


  };
   function getCategories() {
     return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
   }
   let { data, error, isError, isLoading, isFetching } = useQuery({
     queryKey: ["categories"],
     queryFn: getCategories,
    // staleTime:10000,
   
   });

  //  const [categories, setcategories] = useState([]);

  //  function getCategories() {
  //    axios
  //      .get(`https:ecommerce.routemisr.com/api/v1/categories`)
  //      .then((res) => {
  //        console.log(res.data.data);
  //        setcategories(res.data.data);
  //      })
  //      .catch((res) => {
  //        console.log(res);
  //      });
  //  }

  //  useEffect(() => {
  //    getCategories();
  //  }, []);

  if (isError) {
    return <h3>{error.message}</h3>;
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
    <h2 className="text-left my-3 font-semibold text-gray-600">Shop Popular Categories :</h2>
      <Slider {...settings} className="my-7 ">
        {data?.data?.data?.map((category) => {
          return (
            <div key={category._id} >
              <img
                className="w-full h-[200px] object-cover"
                src={category.image}
                alt=""
              />
              <h4>{category.name}</h4>
            </div>
          );
        })}
      </Slider>
    </>
  );
}
