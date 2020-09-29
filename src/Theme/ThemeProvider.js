import React from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";

import theme from "./theme";

createGlobalStyle`body {
  margin: 0;
}`;

export const Base = styled.div`
  font-family: ${props => props.theme.font};
`;

export const DietaThemeProvider = props => {
  return (
    <ThemeProvider theme={props.theme || theme}>
      <Base {...props} />
    </ThemeProvider>
  );
};
