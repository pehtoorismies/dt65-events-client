import { addDecorator, addParameters, configure } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import GlobalStyle from '../src/GlobalStyle';
import React from 'react';
import { ThemeProvider } from 'emotion-theming'
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

addParameters({ viewport: { defaultViewport: 'iphone6' }});
addDecorator(withGlobalStyles);
// addDecorator(withKnobs);


// automatically import all files ending in *.stories.tsx
const req = require.context('../src', true, /\.stories\.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
