import React, { useCallback, useEffect, useState } from "react";
import {
  useParams,
  useSearchParams,
  useNavigate,
  createSearchParams,
} from "react-router-dom";
import {
  Breadcrumbs,
  InputSelect,
  Pagination,
  Product,
  SearchItem,
} from "../../components";
import { sorts } from "../../utils/constants";
import { apiGetProduct } from "../../apis";
import Masonry from "react-masonry-css";
const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};
const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(null);
  const [activeClick, setActiveClick] = useState(null);
  const [params] = useSearchParams();
  const [sort, setSort] = useState("");
  const fetchProductByCategory = async (queries) => {
    const response = await apiGetProduct(queries);
    if (response.success) {
      setProducts(response.products);
    }
  };

  useEffect(() => {
    let param = [];
    for (let i of params.entries()) param.push(i);
    let queries = {};
    for (let i of params) queries[i[0]] = i[1];
    let priceQuery = {};
    if (queries.to && queries.from) {
      priceQuery = {
        $and: [
          { prices: { gte: queries.from } },
          { prices: { lte: queries.to } },
        ],
      };
      delete queries.prices;
    }
    if (queries.from) {
      queries.prices = { gte: queries.from };
    }

    if (queries.to) {
      queries.prices = { lte: queries.to };
    }
    delete queries.to;
    delete queries.from;
    fetchProductByCategory({ ...priceQuery, ...queries });
  }, [params]);
  const changeActiveFilter = useCallback(
    (name) => {
      if (activeClick === name) {
        setActiveClick(null);
      } else {
        setActiveClick(name);
      }
      console.log(activeClick);
    },
    [activeClick]
  );
  const changeValue = useCallback(
    (value) => {
      console.log(value);
      setSort(value);
    },
    [sort]
  );
  useEffect(() => {
    navigate({
      pathname: `/${category}`,
      search: createSearchParams({
        sort,
      }).toString(),
    });
  }, [sort]);
  const { category } = useParams();
  return (
    <div className="w-full">
      <div className="h-[81px] flex justify-center items-center bg-gray-100 ">
        <div className="w-main">
          <h3 className="font-semibold text-[18px] uppercase"> {category}</h3>
          <Breadcrumbs category={category} />
        </div>
      </div>
      <div className="w-main flex justify-between border p-4 mt-8 m-auto">
        <div className="w-4/5 flex-auto flex gap-4">
          <SearchItem
            name="Price"
            activeClick={activeClick}
            changeActiveFilter={changeActiveFilter}
            type="input"
          />
          <SearchItem
            name="Color"
            activeClick={activeClick}
            changeActiveFilter={changeActiveFilter}
          />
        </div>
        <div className="w-1/5 flex flex-col gap-3">
          <span className="font-semibold text-sm">Sort by</span>
          <div className="w-full">
            <InputSelect
              changeValue={changeValue}
              options={sorts}
              value={sort}
            />
          </div>
        </div>
      </div>
      <div className="mt-8 w-main m-auto">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {products?.map((el) => (
            <Product key={el._id} pid={el.id} productData={el} normal={true} />
          ))}
        </Masonry>
      </div>
      <div className="w-main m-auto my-4 flex justify-end">
        <Pagination />
      </div>
      <div className="w-full h-[500px]"></div>
    </div>
  );
};

export default Products;
