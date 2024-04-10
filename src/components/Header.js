import React from "react";
import logo from "../assets/images/logo.png";
import icons from "../utils/icons";
import { Link } from "react-router-dom";
import path from "../utils/path";
const Header = () => {
  const { BsFillTelephoneFill, BiLogoGmail, FaUserCircle, BsHandbagFill } =
    icons;
  return (
    <div className=" w-main flex justify-between h-[110px] py-[35px]">
      <Link to={`/${path.HOME}`}>
        <img src={logo} alt="logo" className="w-[234px] object-contain" />
      </Link>
      <div className="flex text-[12px]  ">
        <div className="flex flex-col items-center px-4">
          <span className="flex gap-4 items-center">
            <BsFillTelephoneFill color="red" />
            <span className="font-semibold">(+1800) 000 8808</span>
          </span>
          <span>Mon-Sat 9:00AM - 8:00PM</span>
        </div>

        <div className="flex flex-col items-centerp px-4 border-l-[1px]">
          <span className="flex gap-4 items-center">
            <BiLogoGmail color="red" />
            <span className="font-semibold"> SUPPORT@TADATHEMES.COM</span>
          </span>
          <span>Online Support 24/7</span>
        </div>

        <div className="cursor-pointer flex items-center justify-center gap-2 px-4 border-l-[1px]">
          <BsHandbagFill color="red" size={20} />
          <span>0 item(s)</span>
        </div>
        <div className=" cursor-pointer flex items-center justify-center px-4 border-l-[1px] gap-2">
          <FaUserCircle color="red" size={24} />
          <span>Profile</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
