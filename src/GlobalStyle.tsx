import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
${reset}
@import url('https://fonts.googleapis.com/css?family=Anonymous+Pro|Titillium+Web:400,700,900&display=swap');

html {
  height: 100%;
}
body {
  height: 100%;
  font-family: 'Titillium Web', sans-serif;
  background-color: #F7F7F7;  
}
p {
  line-height: 1.3;
}

`;

export default GlobalStyle;
