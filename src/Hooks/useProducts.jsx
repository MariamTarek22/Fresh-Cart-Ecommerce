import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function useProducts() {
  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }
  let productsInfo = useQuery({
    queryKey: ["recentProducts"],
    queryFn: getProducts,
    // staleTime:10000,
  });
  
  return productsInfo;
}
 