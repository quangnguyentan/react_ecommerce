import React, { memo, useEffect } from "react";
import { Link } from "react-router-dom";
import path from "../utils/path";
import { getCurrent } from "../stores/user/asyncAtion";
import { useDispatch, useSelector } from "react-redux";
import icons from "../utils/icons";
import { logout } from "../stores/user/userSlice";
const { BiLogOutCircle } = icons;
const TopHeader = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, current } = useSelector((state) => state.user);
  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      if (isLoggedIn) dispatch(getCurrent());
    }, 300);
    return () => {
      clearTimeout(setTimeoutId);
    };
  }, [dispatch, isLoggedIn]);
  return (
    <div className="h-[38px] w-full bg-main flex items-center justify-center">
      <div className="w-main flex items-center justify-between text-xs text-white">
        <span>ORDER ONLINE OR CALL US (+1800) 000 8808</span>
        {isLoggedIn ? (
          <div className="flex gap-4 text-sm items-center">
            {/* ${current.lastname} $ {current.firstname} */}
            <span>{`Welcome,${current?.lastname} ${current?.firstname}   `}</span>
            <span>
              <BiLogOutCircle
                onClick={() => dispatch(logout())}
                size={24}
                className="hover:rounded-full hover:bg-gray-200 cursor-pointer"
              />
            </span>
          </div>
        ) : (
          <Link className="hover:text-gray-700" to={`/${path.LOGIN}`}>
            Sign In or Create Account
          </Link>
        )}
      </div>
    </div>
  );
};

export default memo(TopHeader);
