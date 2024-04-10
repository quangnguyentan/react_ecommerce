import React, { memo } from "react";
import usePanigation from "../hooks/usePanigation";
import PagiItem from "./PagiItem";
const Pagination = ({ totalCount }) => {
  const pagination = usePanigation(66, 2);
  console.log(usePanigation(66, 2));
  return (
    <div className="flex items-center">
      {pagination.map((el) => (
        <PagiItem key={el}>{el} </PagiItem>
      ))}
    </div>
  );
};

export default memo(Pagination);
