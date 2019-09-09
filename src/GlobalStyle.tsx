import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
${reset}

@import url('https://fonts.googleapis.com/css?family=Titillium+Web:400,700,900');

html {
  height: 100%;
}
body {
  height: 100%;
  font-family: 'Titillium Web', sans-serif;
  background-color: #F7F7F7;  
}
`;

export default GlobalStyle;
