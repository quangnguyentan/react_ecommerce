import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Banner,
  Sidebar,
  BestSeller,
  FeatureProduct,
  CustomSlider,
  DealDaily,
} from "../../components";
import icons from "../../utils/icons";
const { MdKeyboardArrowRight } = icons;

const Home = () => {
  const { newProducts } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.app);
  console.log(categories);
  const { isLoggedIn, current } = useSelector((state) => state.user);

  return (
    <>
      <div className="w-main flex">
        <div className="flex flex-col gap-5 w-[25%] flex-auto">
          <Sidebar />
          <DealDaily />
        </div>
        <div className="flex flex-col gap-5 pl-5 w-[75%] flex-auto ">
          <Banner />
          <BestSeller />
        </div>
      </div>
      <div className="my-8">
        <FeatureProduct />
      </div>
      <div className="my-8 w-full">
        <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
          NEW ARRIVALS
        </h3>
        <div className=" mt-4 mx-[-10px]">
          <CustomSlider product={newProducts} />
        </div>
      </div>
      <div className="my-8 w-full">
        <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
          HOT COLLECTIONS
        </h3>
        <div className="flex flex-wrap gap-4 mt-4 ">
          {categories
            ?.filter((el) => el.brand.length > 0)
            ?.map((el) => (
              <div key={el._id} className="w-[396px] ">
                <div className="w-full border flex p-4 gap-4 min-h-[190px] [&>*:first-child]:w-[149px]">
                  <img
                    src={el?.image}
                    alt=""
                    className="h-[129px] object-contain "
                  />
                  <div className="flex-1 text-gray-700">
                    <h4 className="font-semibold uppercase">{el.title}</h4>
                    <ul className="text-sm">
                      {el?.brand?.map((item) => (
                        <span key={item} className="flex items-center gap-2">
                          <MdKeyboardArrowRight size={14} />
                          <li>{item}</li>
                        </span>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="my-8 w-full">
        <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
          BLOG POSTS
        </h3>
      </div>
    </>
  );
};

export default Home;
