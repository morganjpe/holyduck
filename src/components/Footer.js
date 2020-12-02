import React from "react";
import tw, { styled } from "twin.macro";

const Footer = () => {
  return (
    <Footer.container>
      <Footer.inner>
        <p>
          <b>Keep on Quackin&apos;</b>
        </p>
        <p>
          Website developed by{" "}
          <a href="mailto:morgan@morgan-evans.com">Morgan Evans</a>
        </p>
      </Footer.inner>
    </Footer.container>
  );
};

Footer.container = styled.footer`
  width: 100vw;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 10px 0;
  background: ${({ theme }) => theme.colors.hd_red};
`;

Footer.inner = styled.div`
  ${tw`container mx-auto flex justify-between items-center`}
  p {
    font-size: 14px;
    color: white;
    b {
      color: white;
      font-size: 18px;
      font-family: "FrenchFries", sans-serif;
    }
    a {
      color: white;
      text-decoration: none;
      font-weight: 700;
      color: ${({ theme }) => theme.colors.hd_yellow};
      :hover {
        opacity: 0.7;
      }
    }
  }
`;

export default Footer;
