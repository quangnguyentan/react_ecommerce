import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { showModal } from "../stores/app/appSlice";

const Modal = ({ children }) => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() =>
        dispatch(showModal({ isShowModal: false, modalChildren: null }))
      }
      className="absolute inset-0 bg-gray-500 z-50 bg-opacity-90 flex items-center justify-center"
    >
      {children}
    </div>
  );
};

export default memo(Modal);
