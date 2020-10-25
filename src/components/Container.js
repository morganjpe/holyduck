/** @jsx jsx */ import { jsx } from '@emotion/core'
import React from 'react';
import tw from "twin.macro";

const Container = ({children}) => {
  return (
    <section tw="container m-auto">
      <div tw="flex flex-wrap">
        {children}
      </div>
    </section>
  )
}

// const Container = styled.section`
//   ${tw`container m-auto flex`}
// `;

export default Container;
