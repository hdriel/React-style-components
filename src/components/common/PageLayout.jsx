import React from 'react';
import styled from 'styled-components';
import {DEFAULT_FONT} from "utils/consts";
import { Header } from 'components/common/Header';

const Content = styled.main`
  max-width: 800px;
  margin: 80px auto 0 auto;
  padding: 0 16px;
  box-sizing: border-box;
  font-family: sans-serif;
  
  h1, h2, h3, h4, h5, h6 {
    ${DEFAULT_FONT}
  }
`;

export const PageLayout = ({children}) => {
    return (
        <>
            <Header />
            <Content>
                {children}
            </Content>
        </>
    )
};
