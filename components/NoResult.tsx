import React from "react";
import { FaCommentSlash } from "react-icons/fa";

interface IProps {
  text: string;
}

const NoResult = ({ text }: IProps) => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <p className="text-8xl">
        <FaCommentSlash />
      </p>
      <p className="text-2xl text-center">{text}</p>
    </div>
  );
};

export default NoResult;
