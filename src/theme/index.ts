import Color from 'color';

const blue = '#07c';
const red = '#FF5471';
const lightgray = '#9a9a9a';
const lightergrey = '#E6E6E6';
const lightestgrey = '#e9e9e9';
const darkWhite = '#f4f4f5';
const black = '#140D33';
const lightBlack = '#404035';
const pink = '#FF80EA';
const white = '#fff';
const transparentBlack = 'rgba(0,0,0,0.6)';

const primaryForm = {
  bg: 'white',
  border: '1px solid lightgray',
  borderRadius: '4px',
  boxSizing: 'border-box',
  caretColor: 'lightgray',
  fontSize: '16px',
  outline: 'none',
  padding: '18px 8px',
  
  '&::placeholder': {
    color: 'lightgray',
    fontWeight: 'bold',
  },
};
const primaryFormError = {
  ...primaryForm,
  border: '1px solid red',
};
const theme = {
  breakpoints: ['40em', '52em', '64em'],

  buttons: {
    aTest: {
      bg: 'red',
    },
    outline: {
      backgroundColor: 'transparent',
      boxShadow: 'inset 0 0 0 2px',
      color: blue,

      '&:hover': {
        color: Color(blue)
          .lighten(0.5)
          .string(),
      },
    },
    outlinePrimary: {
      backgroundColor: 'transparent',
      boxShadow: 'inset 0 0 0 2px',
      color: pink,
    },
    primary: {
      backgroundColor: pink,
      color: white,

      '&:disabled': {
        backgroundColor: Color(pink)
          .lighten(0.1)
          .string(),
        cursor: 'not-allowed',
      },
      '&:hover': {
        backgroundColor: Color(pink)
          .darken(0.1)
          .string(),
      },
    },
    warn: {
      backgroundColor: red,
      boxShadow: 'inset 0 0 0 2px',
      color: white,

      '&:hover': {
        color: Color(red)
          .lighten(0.5)
          .string(),
      },
    },
  },
  cards: {
    shadow: {
      backgroundColor: 'transparent',
      borderRadius: '15px 15px 15px 15px',
      boxShadow: '0 2px 16px rgba(0, 0, 0, 0.25)',
    },
  },
  colors: {
    black,
    blue,
    darkWhite,
    lightBlack,
    lightergrey,
    lightestgrey,
    lightgray,
    pink,
    red,
    transparentBlack,
    white,
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'Titillium Web',
    monospace: 'Menlo, monospace',
  },
  forms: {
    primary: primaryForm,
    'primary-error': primaryFormError,
  },

  // fonts: {
  //   sans: 'Mukta, sans-serif',
  //   mono: 'Mukta, monospace',
  // },
  shadows: {
    large: '0 0 24px rgba(0, 0, 0, .125)',
    small: '0 0 4px rgba(0, 0, 0, .125)',
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256],
};

export { theme };
