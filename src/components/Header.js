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

Header.container = styled.nav`
  background-color: ${({theme}) => theme.colors.hd_red};
  width: 100%;
  color: white;
  /* border-bottom: 7px solid #FFD791; */
`;

Header.inner = styled.div`
  ${tw`mx-auto container flex`}
`;

Header.nav = styled.nav`
  ${tw`w-full md:w-1/3`}
`;

Header.logo = styled.div`
  ${tw`w-full md:w-1/3`}
`;

export default Header;
