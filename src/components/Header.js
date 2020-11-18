import React from "react";
import tw, { styled } from "twin.macro";

const Header = () => {
  return (
    <Header.container>
      <Header.inner>
        <Header.logo>
          <h1>Holy Duck!</h1>
        </Header.logo>
      </Header.inner>
    </Header.container>
  );
};

Header.container = styled.header`
  z-index: -1;
  background-color: #eee;
  background-position: center;
  background-image: url("https://scontent-lhr8-1.xx.fbcdn.net/v/t1.0-9/124143353_102063475053034_3417673291661537983_o.jpg?_nc_cat=109&ccb=2&_nc_sid=e3f864&_nc_ohc=Ztnx_f28v0cAX-DhuHS&_nc_oc=AQkiaXOQrydBqFYSPPD0Z9InXzNFPo1iOWc76Hh_hgzcLo3GAP6SqF1Yu6En33qYnhU&_nc_ht=scontent-lhr8-1.xx&oh=c92d21107eb8d19b9da3b8929a42b0a4&oe=5FD39885");
  background-size: cover;
  width: 100%;
  color: white;
  padding: 20px 0 80px 0;
  position: relative;
  &::after {
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  }
`;

Header.inner = styled.div`
  ${tw`mx-auto container flex relative`}
  z-index: 1;
  padding-left: 15px;
`;

Header.nav = styled.nav`
  ${tw`w-full md:w-1/3`}
`;

Header.logo = styled.div`
  ${tw`w-full md:w-1/3`}
`;

export default Header;
