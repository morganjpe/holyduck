import { styled } from "twin.macro";

export const Button = styled.button`
  background: ${({ theme }) => theme.colors.hd_red};
  width: 100%;
  text-align: center;
  border: none;
  color: white;
  font-weight: 700;
  font-size: 22px;
  padding: 20px;
  cursor: pointer;
  font-family: "FrenchFries", sans-serif;
  letter-spacing: 1px;
  :hover {
    opacity: 0.9;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 22px;
  line-height: 22px;
  cursor: pointer;
  color: white;
  background: ${({ theme }) => theme.colors.hd_red};
  border: none;
  span {
    position: absolute;
    left: -10000px;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }
`;
