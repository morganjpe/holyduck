import React from "react";
import tw, { styled } from "twin.macro";

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Loading = () => {
  return (
    <div>
      <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
    </div>
  );
};

export default Loading;
