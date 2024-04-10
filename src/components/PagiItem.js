import React, { memo } from "react";
import clsx from "clsx";
const PagiItem = ({ children }) => {
  return (
    <div
      className={clsx(
        "w-10 h-10 flex pb-2 justify-center p-4 hover:rounded-full hover:bg-gray-300 cursor-pointer",
        !Number(children) && "items-end"
      )}
    >
      {children}
    </div>
  );
};

export default memo(PagiItem);
