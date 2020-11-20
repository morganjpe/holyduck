import React from "react";
import { styled } from "twin.macro";

const SkipToContent = () => {
  return (
    <SkipToContent.nav>
      <ul>
        <li tabIndex="1">
          <a href="#menu">Skip to menu</a>
        </li>
      </ul>
    </SkipToContent.nav>
  );
};

SkipToContent.nav = styled.nav`
  ul {
    list-style: none;
    margin: 0;
  }

  li a {
    font-size: 1em;
    line-height: 1;
    background: #ededed;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    left: -9999px;
    top: 2px;
    padding: 0.375em;
    position: absolute;
    z-index: 12;
    text-decoration: none;
  }

  li a:focus {
    left: 50%;
    transform: translateX(-50%);
  }
`;

export default SkipToContent;
