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
export default Container;
