import React from "react";
import tw, { styled } from "twin.macro";

const Header = () => {
  return (
    <Header.container>
      <Header.logo>
        <h1>Holy Duck!</h1>
      </Header.logo>
    </Header.container>
  );
};

Header.container = styled.nav`
  ${tw`mx-auto container flex`}
  border-bottom: 1px solid #eee;
`;

Header.nav = styled.nav`
  ${tw`w-full md:w-1/3`}
`;

Header.logo = styled.div`
  ${tw`w-full md:w-1/3`}
`;

export default Header;
