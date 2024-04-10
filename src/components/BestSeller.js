import React, { useState, useEffect } from "react";
import { Product, CustomSlider } from "./";
import { apiGetProduct } from "../apis/product";
import Slider from "react-slick";
import { getNewProducts } from "../stores/products/asyncAction";
import { useDispatch, useSelector } from "react-redux";
const tabs = [
  {
    id: 1,
    name: "best seller",
  },
  {
    id: 2,
    name: "new arrivals",
  },
];
var settings = {
  dots: false,  
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};
const BestSeller = () => {
  const [bestSeller, setBestSeller] = useState(null);
  // const [newProduct, setNewProduct] = useState(null);
  const [activedTab, setactivedTab] = useState(1);
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const { newProducts } = useSelector((state) => state.products);
  const fetchProducts = async () => {
    const response = await apiGetProduct({ sort: "-sold" });
    if (response?.success) {
      setBestSeller(response.products);
      setProduct(response.products);
    }
    // if (response[1]?.success) setNewProduct(response[1].products);
  };
  useEffect(() => {
    fetchProducts();
    dispatch(getNewProducts());
  }, []);
  useEffect(() => {
    if (activedTab === 1) setProduct(bestSeller);
    if (activedTab === 2) setProduct(newProducts);
  }, [activedTab]);
  return (
    <div>
      <div className="flex text-[20px] gap-8 pb-4 border-b-2 border-main first:[&>span]:border-r-[1px] first:[&>span]:pr-6 first:[&>span]:box-border">
        {tabs.map((el) => (
          <span
            key={el.id}
            className={`font-semibold cursor-pointer uppercase text-gray-400 ${
              activedTab === el.id ? "text-gray-900 " : ""
            }`}   
            onClick={() => setactivedTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>
      <div className="mt-4 mx-[-10px]">
        <CustomSlider product={product} activedTab={activedTab} />
      </div>
      <div className="w-full flex gap-4 mt-4">
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657"
          alt="banner"
          className="flex-1 object-contain "
        />
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657"
          alt="banner"
          className="flex-1 object-contain "
        />
      </div>
    </div>
  );
};

export default BestSeller;
