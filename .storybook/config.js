import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { ThemeProvider } from 'emotion-theming'
import GlobalStyle from '../src/GlobalStyle';
import { theme } from '../src/theme';

const withGlobalStyles = storyFn => (
  <React.Fragment>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <div
        style={
          {
            // backgroundColor: '#dfdfdf',
          }
        }
      >
        {storyFn()}
      </div>
    </ThemeProvider>
  </React.Fragment>
);

addDecorator(withGlobalStyles);

// automatically import all files ending in *.stories.tsx
const req = require.context('../src', true, /\.stories\.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
