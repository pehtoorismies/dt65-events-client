import { addDecorator, addParameters, configure } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { ThemeProvider } from 'emotion-theming';
import React from 'react';

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

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: 'iphone5',
  },
});
addDecorator(withGlobalStyles);

// automatically import all files ending in *.stories.tsx
const req = require.context('../src', true, /\.stories\.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
