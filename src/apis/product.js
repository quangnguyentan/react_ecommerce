import axios from "../axios";
export const apiGetProduct = (params) =>
  axios({
    url: "/product/",
    method: "GET",
    params,
  });
export const apiGetProductById = (id) =>
  axios({
    url: "/product/" + id,
    method: "GET",
  });
export const apiRatings = (data) =>
  axios({
    url: "/product/ratings",
    method: "PUT",
    data,
  });
