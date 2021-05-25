import { DEFAULT_FONT } from 'utils/consts';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    background: ${p => p.theme.bodyBackgroundColor};
    height: 100vh;
    margin: 0;
    color: ${p => p.theme.bodyFontColor};
    ${DEFAULT_FONT}
  }
`;
