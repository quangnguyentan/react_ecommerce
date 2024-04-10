import React, { useState, useEffect } from "react";
import { ProductCard } from "./";
import { apiGetProduct } from "../apis/";
const FeatureProduct = () => {
  const [product, setProduct] = useState(null);
  const fetchProducts = async () => {
    const response = await apiGetProduct({
      limit: 9,

      totalRatings: 4,
    });
    if (response.success) setProduct(response.products);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className=" w-full ">
      <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
        FEATURED PRODUCTS
      </h3>
      <div className="flex flex-wrap mt-[15px] mx-[-10px] ">
        {product?.map((el) => (
          <ProductCard key={el._id} product={el} />
        ))}
      </div>
      <div className="flex justify-between">
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661"
          alt=""
          className="w-[49.7%] object-contain"
        />
        <div className="flex flex-col justify-between w-[24%] gap-4 ">
          <img
            src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-bottom-home2_400x.jpg?v=1613166661"
            alt=""
          />
          <img
            src="https://digital-world-2.myshopify.com/cdn/shop/files/banner3-bottom-home2_400x.jpg?v=1613166661"
            alt=""
          />
        </div>
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661"
          alt=""
          className="w-[24%] object-contain"
        />
      </div>
    </div>
  );
};

export default FeatureProduct;
