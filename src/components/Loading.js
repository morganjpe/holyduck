import React from "react";
import tw, { styled } from "twin.macro";

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Loading = ({ theme }) => {
  return (
    <Loading.container>
      <Loader type="ThreeDots" color="#4662FF" height={80} width={80} />
    </Loading.container>
  );
};

Loading.container = styled.div`
  ${tw`flex items-center justify-center`}
  height: 400px;
`;

export default Loading;
