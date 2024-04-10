import React, { memo, useRef, useEffect, useState } from "react";
import logo from "../assets/images/logo.png";
import { voteOptions } from "../utils/constants";
import { AiFillStar } from "react-icons/ai";
import Button from "./Button";
const VoteOption = ({ nameProduct, handSubmitVoteOption }) => {
  const modalRef = useRef();
  const [chosenStar, setChosenStar] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    modalRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
  }, []);
  return (
    <div
      ref={modalRef}
      onClick={(e) => e.stopPropagation()}
      className="bg-white w-[700px] flex-col p-4 flex items-center justify-center"
    >
      <img src={logo} alt="logo" className="w-[300px] my-8 object-contain" />
      <h2 className="text-center text-medium text-lg ">{`Voting product ${nameProduct} `}</h2>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="form-textarea w-full placeholder:italic placeholder:text-xs placeholder:text-gray-500 text-sm"
        placeholder="Let's inputting to review our product"
      ></textarea>
      <div className="w-full flex flex-col gap-4 items-center">
        <p>How do you like this product?</p>
        <div className="flex items-center gap-4 p-4">
          {voteOptions.map((el) => (
            <div
              onClick={() => setChosenStar(el.id)}
              key={el.id}
              className="w-[60px] flex h-[60px] items-center justify-center flex-col rounded-md bg-gray-200 cursor-pointer  "
            >
              {Number(chosenStar) && chosenStar >= el.id ? (
                <AiFillStar color="orange" />
              ) : (
                <AiFillStar color="gray" />
              )}
              <span>{el.text}</span>
            </div>
          ))}
        </div>
      </div>
      <Button
        handleOnclick={() =>
          handSubmitVoteOption({ comment, score: chosenStar })
        }
        fw
        name="Submit"
      ></Button>
    </div>
  );
};

export default memo(VoteOption);
