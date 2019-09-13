import Color from 'color';

const blue = '#07c';
const red = '#FF5471';
const lightgray = '#9a9a9a';
const lightergray = '#E6E6E6';
const lightestgray = '#e9e9e9';
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
  width: '100%',

  '&::placeholder': {
    color: 'lightgray',
    fontWeight: 'bold',
  },
};
const primaryFormError = {
  ...primaryForm,
  border: '1px solid red',
};

const eventForm = {
  bg: 'transparent',
  border: 0,
  borderBottom: '1px solid gray',
  boxSizing: 'border-box',
  caretColor: 'pink',
  fontSize: '24px',
  outline: 'none',
  padding: '2px 2px',
  width: '100%',

  '&::placeholder': {
    color: 'lightgray',
    fontWeight: 'bold',
  },
};

const eventFormError = {
  ...eventForm,
  borderBottom: '1px solid red',
};

const primaryButton = {
  // width: '100%',
  py: 3,
  backgroundColor: pink,
  color: white,
  textTransform: 'uppercase',
  fontWeight: 'bold',
  '&[disabled]': {
    backgroundColor: Color(pink)
      .lighten(0.4)
      .string(),
    cursor: 'not-allowed',
  },
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: Color(pink)
      .darken(0.1)
      .string(),
  },
};

const theme: any = {
  breakpoints: ['40em', '52em', '64em'],

  buttons: {
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
      ...primaryButton,
      backgroundColor: 'transparent',
      boxShadow: 'inset 0 0 0 2px',
      color: pink,
      '&:hover': {
        cursor: 'pointer',
        backgroundColor: Color(pink)
          .lighten(0.8)
          .string(),
      },
    },
    primary: primaryButton,
    secondary: {
      ...primaryButton,
      backgroundColor: blue,
      width: 'auto',
      '&:hover': {
        cursor: 'pointer',
        backgroundColor: Color(blue)
          .darken(0.1)
          .string(),
      },
      '&[disabled]': {
        cursor: 'not-allowed',
        backgroundColor: lightergray,
      },
      '&[disabled]:hover': {
        cursor: 'not-allowed',
        backgroundColor: lightergray,
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
    lightergray,
    lightestgray,
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
    monospace: `'Share Tech Mono', monospace`,
  },
  forms: {
    primary: primaryForm,
    'primary-error': primaryFormError,
    event: eventForm,
    'event-error': eventFormError,
  },

  shadows: {
    large: '0 0 24px rgba(0, 0, 0, .125)',
    small: '0 0 4px rgba(0, 0, 0, .125)',
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256],
};

const colors = theme.colors;

export { theme, colors };
