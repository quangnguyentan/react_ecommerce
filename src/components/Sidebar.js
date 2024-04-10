import React from "react";
import { NavLink } from "react-router-dom";
import { createSlug } from "../utils/helpers";
import { useSelector } from "react-redux";
const Sidebar = () => {
  // const [categories, setCategories] = useState([]); // nếu dùng null thì .map bị lỗi khi đó dùng ?.(option changing) hoặc categories && categories.map()
  // const fetchCategories = async () => {
  //   const response = await apiGetCategories();
  //   if (response.success) setCategories(response.productCategories);
  // };
  // useEffect(() => {
  //   fetchCategories();
  // }, []);
  const { categories } = useSelector((state) => state.app);
  console.log(createSlug("đồ chơi - mẹ & bé"));
  return (
    <div className="flex flex-col border">
      {categories?.map((el) => (
        <NavLink
          key={createSlug(el.title)}
          to={createSlug(el.title)}
          className={({ isActive }) =>
            isActive
              ? "bg-main text-white px-5 pt-[15px] pb-[14px] text-sm hover:text-main "
              : "px-5 pt-[15px] pb-[14px] text-sm hover:text-main"
          }
        >
          {el.title}
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
