import React, { useState } from "react";
import { fomatMoney } from "../utils/helpers";
import lable from "../assets/images/new.png";
import lableBlue from "../assets/images/trending.png";
import { renderStartFromNumber } from "../utils/helpers";
import { SelectOption } from "./";
import icons from "../utils/icons";
import { Link } from "react-router-dom";
import path from "../utils/path";
const { BsFillHeartFill, AiFillEye, BiMenu } = icons;
const Product = ({ productData, isNew, normal }) => {
  const [isShowOption, setIsNewOption] = useState(false);
  return (
    <div className="w-full text-base px-[10px]">
      <Link
        to={`/${productData?.category?.toLowerCase()}/${productData?._id}/${
          productData?.title
        }`}
        className="w-full border p-[15px] flex flex-col items-center"
        onMouseEnter={(e) => {
          e.stopPropagation();
          setIsNewOption(true);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          setIsNewOption(false);
        }}
      >
        <div className="w-full relative">
          {isShowOption && (
            <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 animate-slide-top">
              <SelectOption icon={<AiFillEye />} />
              <SelectOption icon={<BiMenu />} />
              <SelectOption icon={<BsFillHeartFill />} />
            </div>
          )}
          <img
            src={productData?.images[0] || ""}
            alt=""
            className="w-[243px] h-[243px] object-cover "
          />
          {!normal && (
            <img
              src={isNew ? lableBlue : lable}
              alt=""
              className={`absolute top-0 right-0 w-[100px]
           h-[35px] object-cover`}
            />
          )}
        </div>
        <div className="flex flex-col gap-1 mt-[15px] items-start w-full">
          <span className="line-clamp-1">{productData?.title}</span>
          <span className="flex">
            {renderStartFromNumber(productData?.totalRatings)?.map(
              (el, index) => (
                <span key={index}>{el}</span>
              )
            )}
          </span>

          <span>{`${fomatMoney(productData?.prices)} VND`}</span>
        </div>
      </Link>
    </div>
  );
};

export default Product;
