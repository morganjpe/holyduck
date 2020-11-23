import { render } from "@testing-library/react";
import React from "react";
import { styled } from "twin.macro";

const Alert = ({ message }) => {
  render(<div role="alert">{message}</div>);
};

Alert.container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

export default Alert;
