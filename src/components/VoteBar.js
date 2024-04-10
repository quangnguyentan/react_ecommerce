import React, { memo, useRef, useEffect } from "react";
import icons from "../utils/icons";
const { AiFillStar } = icons;
const VoteBar = ({ number, ratingCount, ratingTotal }) => {
  const percentRef = useRef();
  useEffect(() => {
    const percent = Math.round((ratingCount * 100) / ratingTotal) || 0;
    percentRef.current.style.cssText = `right:${100 - percent}%`;
  }, [ratingCount, ratingTotal]);
  return (
    <div className="flex items-center gap-2 text-gray-500 ">
      <div className="flex flex-1 items-center justify-center gap-1 text-sm">
        <span>{number}</span>
        <AiFillStar color="orange" />
      </div>
      <div className=" flex-9 ">
        <div className="relative w-full h-[6px] bg-gray-200 rounded-r-full rounded-l-full">
          <div
            ref={percentRef}
            className="absolute inset-0 bg-red-500 rounded-r-full rounded-l-full  "
          ></div>
        </div>
      </div>
      <div className="flex-2 text-xs text-400 flex justify-center">
        {ratingCount > 1
          ? `${ratingCount || 0} reviewers`
          : `${ratingCount || 0} reviewer`}
      </div>
    </div>
  );
};

export default memo(VoteBar);
