import React, { memo } from "react";

const Button = ({ name, handleOnclick, style, iconsBefore, iconAfter, fw }) => {
  return (
    <button
      type="button"
      className={
        style
          ? style
          : `${
              fw ? "w-full" : "w-fit"
            } px-4 py-2 rounded-md text-white bg-main hover:bg-gray-700`
      }
      onClick={() => {
        handleOnclick && handleOnclick();
      }}
    >
      {iconsBefore}
      <span>{name}</span>
      {iconAfter}
    </button>
  );
};

export default memo(Button);
