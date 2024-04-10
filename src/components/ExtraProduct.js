import React, { memo } from "react";

const ExtraProduct = ({ icons, sub, title }) => {
  return (
    <div className="flex items-center p-4 gap-4 mb-[10px] border">
      <span className="p-2 bg-gray-700 rounded-full flex items-center justify-center">
        {icons}
      </span>
      <div className="flex flex-col text-sm text-gray-500">
        <span className="font-medium">{title}</span>
        <span>{sub}</span>
      </div>
    </div>
  );
};

export default memo(ExtraProduct);
