import React, { useCallback, useEffect, useState } from "react";
import {
  Breadcrumbs,
  Button,
  SelectQuantity,
  ExtraProduct,
  ProductInformation,
  CustomSlider,
  FeatureProduct,
} from "../../components";
import { productExtrainformation } from "../../utils/constants";
import { Link, useParams } from "react-router-dom";
import { apiGetProduct, apiGetProductById } from "../../apis";
import Slider from "react-slick";
import {
  formatPrice,
  fomatMoney,
  renderStartFromNumber,
} from "../../utils/helpers";
import ReactImageMagnify from "react-image-magnify";
var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};
const DetailProducts = () => {
  const { pid, title, category } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relativedProducts, setRelativedProducts] = useState(null);
  const [update, setUpdate] = useState(false);
  const fetchProductData = async () => {
    const response = await apiGetProductById(pid);
    if (response.success) {
      setProduct(response.productDatas);
      setCurrentImage(response.productDatas?.images);
    }
  };
  const fetchProducts = async () => {
    const response = await apiGetProduct({ category });

    if (response.success) {
      setRelativedProducts(response.products);
    }
  };
  useEffect(() => {
    if (pid) {
      fetchProductData();
      fetchProducts();
    }
    window.scrollTo(0, 0);
  }, [pid]);
  useEffect(() => {
    if (pid) {
      fetchProductData();
    }
  }, [update]);
  const rerender = useCallback(() => {
    setUpdate(!update);
  }, [update]);
  const handleQuantity = useCallback(
    (number) => {
      if (!Number(number) || Number < 1) {
        return;
      } else {
        setQuantity(number);
      }
    },
    [quantity]
  );
  const handleChangeQuantity = useCallback(
    (flag) => {
      if (flag === "minus" && quantity === 1) return;
      if (flag === "minus") {
        setQuantity((prev) => +prev - 1);
      }
      if (flag === "plus") {
        setQuantity((prev) => +prev + 1);
      }
    },
    [quantity]
  );
  const handleClickImage = (e, el) => {
    setCurrentImage(el);
  };
  return (
    <div className="w-full">
      <div className="h-[81px] flex justify-center items-center bg-gray-100 ">
        <div className="w-main flex flex-col">
          <h3 className="font-semibold text-[18px]"> {title}</h3>
          <Breadcrumbs title={title} category={category} />
        </div>
      </div>
      <div className="w-main m-auto mt-4 flex">
        <div className="w-2/5 flex flex-col gap-4">
          <div className="h-[458px] w-[458px] border ">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "",
                  isFluidWidth: true,
                  src: currentImage,
                },
                largeImage: {
                  src: currentImage,
                  width: 800,
                  height: 800,
                },
                isHintEnabled: true,
              }}
            />
          </div>

          <div className="w-[458px] ">
            <Slider className="image-slider" {...settings}>
              {product?.imagescat?.map((el, index) => (
                <div className="flex w-full gap-2 " key={index}>
                  <img
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClickImage(e, el);
                    }}
                    src={el}
                    alt="sub-product"
                    className=" h-[143px] w-[143px] object-cover border cursor-pointer"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className="w-2/5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[30px] font-semibold">
              {fomatMoney(formatPrice(product?.prices))} VNĐ
            </h2>
            <span className="text-sm text-main pr-2">
              Sản phẩm còn lại: {product?.quantity}
            </span>
          </div>
          <div className="flex items-center  ">
            {renderStartFromNumber(product?.totalRatings)?.map((el, index) => (
              <span key={index}>{el}</span>
            ))}
            <span className="text-sm text-main italic">
              {`Đã bán : ${product?.sold} cái`}
            </span>
          </div>
          <ul className="text-sm text-gray-500 list-square pl-4">
            {product?.description?.map((el, index) => (
              <li className="leading-8 list-square" key={index}>
                {el}
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-6">
            <SelectQuantity
              quantity={quantity}
              handleQuantity={handleQuantity}
              handleChangeQuantity={handleChangeQuantity}
            />
            <Button fw name="Add to Cart"></Button>
          </div>
        </div>
        <div className="w-1/5">
          {productExtrainformation?.map((el) => (
            <ExtraProduct
              key={el.id}
              title={el.title}
              sub={el.sub}
              icons={el.icons}
            />
          ))}
        </div>
      </div>

      <div className="w-main m-auto mt-8">
        <ProductInformation
          totalRatings={product?.totalRatings}
          ratings={product?.rating}
          nameProduct={product?.title}
          pid={product?._id}
          rerender={rerender}
        />
      </div>
      <div className="w-main m-auto my-8">
        <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
          OTHER CUSTOMERS ALSO BUY:
        </h3>
        <CustomSlider normal product={relativedProducts} />
      </div>
    </div>
  );
};

export default DetailProducts;
