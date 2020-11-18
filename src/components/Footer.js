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
`;

Footer.inner = styled.div`
  ${tw`container mx-auto flex justify-between items-center`}
  p {
    font-size: 14px;
    b {
      color: ${({ theme }) => theme.colors.hd_red};
      font-weight: 700;
    }
    a {
      color: ${({ theme }) => theme.colors.hd_red};
      text-decoration: none;
      :hover {
        opacity: 0.7;
      }
    }
  }
`;

export default Footer;
