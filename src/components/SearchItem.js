import React, { memo, useEffect, useState } from "react";
import icons from "../utils/icons";
import { color } from "../utils/constants";
import { createSearchParams, useNavigate, useParams } from "react-router-dom";
import { apiGetProduct } from "../apis";
import { fomatMoney } from "../utils/helpers";
import useDebounce from "../hooks/useDebounce";
const { AiOutlineDown } = icons;
const SearchItem = ({
  name,
  activeClick,
  changeActiveFilter,
  type = "checkbox",
}) => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [selected, setSelected] = useState([]);
  const [bestPrice, setBestPrice] = useState(null);
  const [prices, setPrices] = useState({
    from: "",
    to: "",
  });

  const handleSelect = (e) => {
    const alreadyEl = selected.find((el) => el === e.target.value);
    if (alreadyEl)
      setSelected((pre) => pre.filter((el) => el !== e.target.value));
    else setSelected((prev) => [...prev, e.target.value]);
    changeActiveFilter(null);
  };
  const fetchSearchPriceProduct = async () => {
    const response = await apiGetProduct({ sort: "-prices", limit: 1 });
    if (response.success) {
      setBestPrice(response.products[0]?.prices);
    }
  };
  useEffect(() => {
    if (selected.length > 0) {
      navigate({
        pathname: `/${category}`,
        search: createSearchParams({
          color: selected.join(","),
        }).toString(),
      });
    } else {
      navigate({
        pathname: `/${category}`,
      });
    }
  }, [selected]);
  useEffect(() => {
    if (type === "input") {
      fetchSearchPriceProduct();
    }
  }, [type]);
  // useEffect(() => {
  //   if (prices.from > prices.to)
  //     alert("From prices cannot greater than To prices");
  // }, [prices]);
  const debouncePriceFrom = useDebounce(prices.from, 500);
  const debouncePriceTo = useDebounce(prices.to, 500);

  useEffect(() => {
    const data = {};
    if (Number(prices.from) > 0) data.from = prices.from;
    if (Number(prices.to) > 0) data.to = prices.to;
    navigate({
      pathname: `/${category}`,
      search: createSearchParams(data).toString(),
    });
  }, [debouncePriceFrom, debouncePriceTo]);
  return (
    <div
      onClick={() => changeActiveFilter(name)}
      className="p-3 cursor-pointer text-gray-500 text-xs gap-6 relative border-gray-800 flex justify-center items-center"
    >
      <span className="capitalize">{name}</span>
      <AiOutlineDown />
      {activeClick === name && (
        <div className="absolute top-[calc(100%+1px)] z-10 p-4 left-0 w-fit border bg-white min-w-[150px] ">
          {type === "checkbox" && (
            <div className="">
              <div className="p-4 items-center flex justify-between gap-8 border-b">
                <span className="whitespace-nowrap">{`${selected} selected`}</span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected([]);
                  }}
                  className="underline cursor-pointer hover:text-main"
                >
                  Reset
                </span>
              </div>
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex flex-col gap-2 mt-4"
              >
                {color.map((el, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="form-checkbox cursor-pointer"
                      name={el}
                      value={el}
                      onChange={handleSelect}
                      id={el}
                      checked={selected.some(
                        (selectedItem) => selectedItem === el
                      )}
                    />
                    <label className="capitalize text-gray-700" htmlFor={el}>
                      {el}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
          {type === "input" && (
            <div onClick={(e) => e.stopPropagation()}>
              <div className="p-4 items-center flex justify-between gap-8 border-b">
                <div className="flex flex-col gap-2">
                  <span>{`The highest price is ${fomatMoney(
                    bestPrice
                  )} VND `}</span>
                  <span>Default input value is USD</span>
                </div>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setPrices({ from: "", to: "" });
                    changeActiveFilter(null);
                  }}
                  className="underline cursor-pointer hover:text-main"
                >
                  Reset
                </span>
              </div>
              <div className="flex items-center gap-2 p-2">
                <div className="flex items-center gap-2">
                  <label htmlFor="from">From</label>
                  <input
                    className="form-input"
                    type="number"
                    id="from"
                    value={prices.from}
                    onChange={(e) =>
                      setPrices((prev) => ({ ...prev, from: e.target.value }))
                    }
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="to">To</label>
                  <input
                    className="form-input"
                    type="number"
                    id="to"
                    value={prices.to}
                    onChange={(e) =>
                      setPrices((prev) => ({ ...prev, to: e.target.value }))
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(SearchItem);
