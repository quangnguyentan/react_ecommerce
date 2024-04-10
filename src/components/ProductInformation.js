import React, { memo, useState, useCallback } from "react";
import { productInfTabs } from "../utils/constants";
import { Button, VoteBar, VoteOption, Comment } from "../components/";
import { renderStartFromNumber } from "../utils/helpers";
import { apiRatings } from "../apis";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../stores/app/appSlice";
import Swal from "sweetalert2";
import path from "../utils/path";
import { useNavigate } from "react-router-dom";
const ProductInformation = ({
  totalRatings,
  ratings,
  nameProduct,
  pid,
  rerender,
}) => {
  const [activedTab, setActivedTab] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.user);
  const handSubmitVoteOption = async ({ comment, score }) => {
    if (!comment || !score || !pid) {
      alert("Please vote before submitting");
      return;
    }
    await apiRatings({
      star: score,
      comment: comment,
      pid,
      updatedAt: Date.now(),
    });
    rerender();
    dispatch(showModal({ isShowModal: false, modalChildren: null }));
  };
  const handleVoteNow = () => {
    if (!isLoggedIn) {
      Swal.fire({
        text: "Login before voting",
        cancelButtonText: "Cancel",
        confirmButtonText: "Go Login",
        showCancelButton: true,
        title: "Oops!",
      }).then((rs) => {
        if (rs.isConfirmed) navigate(`/${path.LOGIN}`);
      });
    } else {
      dispatch(
        showModal({
          isShowModal: true,
          modalChildren: (
            <VoteOption
              nameProduct={nameProduct}
              handSubmitVoteOption={handSubmitVoteOption}
            />
          ),
        })
      );
    }
  };
  return (
    <div>
      <div className="flex items-center gap-2 relative bottom-[-1px]">
        {productInfTabs?.map((el) => (
          <span
            onClick={() => setActivedTab(el.id)}
            className={`p-2 border cursor-pointer ${
              activedTab === +el.id
                ? "bg-white border-b-0 "
                : " bg-gray-200 text-gray-800"
            } `}
            key={el.id}
          >
            {el.name}
          </span>
        ))}
        <div
          onClick={() => setActivedTab(5)}
          className={`p-2 border cursor-pointer ${
            activedTab === 5
              ? "bg-white border-b-0 "
              : " bg-gray-200 text-gray-800"
          } `}
        >
          CUSTOMER REVIEW
        </div>
      </div>
      <div className="w-full] border p-4">
        {productInfTabs.some((el) => el.id === activedTab) &&
          productInfTabs.find((el) => el.id === activedTab)?.content}
        {activedTab === 5 && (
          <div className="flex p-4 flex-col">
            <div className="flex">
              <div className="border-blue-500 border flex-4 flex items-center justify-center flex-col">
                <span className="font-semibold text-3xl">{`${totalRatings} / 5`}</span>
                <span className="flex">
                  {renderStartFromNumber(totalRatings)?.map((el, index) => (
                    <span key={index}>{el}</span>
                  ))}
                </span>
                <span>
                  {ratings?.length > 1
                    ? `${ratings?.length || 0} reviewers`
                    : `${ratings?.length || 0} reviewer`}
                </span>
              </div>
              <div className="flex-6 border p-4 flex flex-col gap-2 ">
                {Array.from(Array(5).keys())
                  .reverse()
                  ?.map((el) => (
                    <VoteBar
                      key={el}
                      number={el + 1}
                      ratingTotal={ratings?.length}
                      ratingCount={
                        ratings?.filter((i) => i.star === el + 1)?.length
                      }
                    />
                  ))}
              </div>
            </div>
            <div className="flex flex-col p-4 text-sm gap-2 items-center justify-center">
              <span>Do you want to rate this product?</span>
              <Button handleOnclick={handleVoteNow} name="RATING NOW"></Button>
            </div>
            <div>
              {ratings?.map((el) => (
                <Comment
                  key={el._id}
                  star={el.star}
                  updatedAt={el.updatedAt}
                  comment={el.comment}
                  name={`${el.postedBy?.firstname} ${el.postedBy?.lastname}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(ProductInformation);
