import React from "react";
import { renderStartFromNumber, fomatMoney } from "../utils/helpers";
const ProductCard = ({ product }) => {
  return (
    <div className="w-1/3 flex-auto px-[10px] mb-[20px] ">
      <div className="border w-full flex">
        <img
          src={product?.images}
          alt="products"
          className="w-[90px] object-contain p-4"
        />
        <div className="flex flex-col gap-1 mt-[15px] items-start w-full text-xs">
          <span className="line-clamp-1 capitalize text-sm">
            {product?.title?.toLowerCase()}
          </span>
          <span className="flex">
            {renderStartFromNumber(product?.totalRatings, 14)?.map(
              (el, index) => (
                <span key={index}>{el}</span>
              )
            )}
          </span>
          <span>{`${fomatMoney(product?.prices)} VND`}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
