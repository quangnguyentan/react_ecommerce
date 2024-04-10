import React, { useState, useEffect, memo } from "react";
import { fomatMoney } from "../utils/helpers";
import { renderStartFromNumber, secondsToHms } from "../utils/helpers";
import icons from "../utils/icons";
import moment from "moment";
import { apiGetProduct } from "../apis/product";
import { CountDown } from "./";
const { AiFillStar, BiMenu } = icons;
let idInterval;

const DealDaily = () => {
  const [dealdaily, setDealdaily] = useState(null);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [expireTime, setExpireTime] = useState(false);
  const fetchDealDaily = async () => {
    const response = await apiGetProduct({
      limit: 1,
      page: Math.round(Math.random() * 10),
      totalRatings: 5,
    });
    if (response.success) {
      setDealdaily(response.products[0]);
      const today = `${moment().format("MM/DD/YYYY")} 5:00:00`;
      const seconds =
        new Date(today).getTime() - new Date().getTime() + 24 * 3600 * 1000;
      const number = secondsToHms(seconds);

      setHours(number.h);
      setMinutes(number.m);
      setSeconds(number.s);
    } else {
      setHours(0);
      setMinutes(59);
      setSeconds(59);
    }
  };
  useEffect(() => {
    idInterval && clearInterval(idInterval);
    fetchDealDaily();
  }, [expireTime]);
  useEffect(() => {
    idInterval = setInterval(() => {
      if (seconds > 0) setSeconds((prev) => prev - 1);
      else {
        if (minutes > 0) {
          setMinutes((prev) => prev - 1);
          setSeconds(59);
        } else {
          if (hours > 0) {
            setHours((prev) => prev - 1);
            setMinutes(59);
            setSeconds(59);
          } else {
            setExpireTime(!expireTime);
          }
        }
      }
    }, 1000);
    return () => {
      clearInterval(idInterval);
    };
  }, [seconds, minutes, hours, expireTime]);
  return (
    <div className="border w-full flex-auto ">
      <div className="flex justify-between items-center p-4">
        <span className="flex-3 flex justify-start">
          <AiFillStar size={20} color="#DD1111" />
        </span>
        <span className="flex-5 font-semibold text-[20px] text-center text-gray-700">
          DAILY DEALS
        </span>
        <span className="flex-2"></span>
      </div>
      <div className="w-full flex flex-col items-center pt-14 gap-2">
        <img
          src={dealdaily?.images[0] || ""}
          alt=""
          className="w-full object-contain "
        />
        <span className="line-clamp-1 text-center pt-6">
          {dealdaily?.title}
        </span>
        <span className="flex ">
          {renderStartFromNumber(dealdaily?.totalRatings, 20)?.map(
            (el, index) => (
              <span key={index}>{el}</span>
            )
          )}
        </span>
        <span>{`${fomatMoney(dealdaily?.prices)} VNĐ`}</span>
      </div>
      <div className="px-4 mt-4">
        <div className="flex justify-center gap-2 items-center mb-4">
          <CountDown unit={"Hours"} number={hours} />
          <CountDown unit={"Minutes"} number={minutes} />
          <CountDown unit={"Seconds"} number={seconds} />
        </div>
        <button
          type="button"
          className="flex gap-2 items-center justify-center w-full bg-main hover:bg-gray-800 text-white font-medium py-2"
        >
          <BiMenu />
          <span>Options</span>
        </button>
      </div>
    </div>
  );
};

export default memo(DealDaily);
