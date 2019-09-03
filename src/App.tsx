import { ThemeProvider } from 'emotion-theming'
import React, { Fragment } from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Box, Button } from 'rebass';


import { ROUTES } from './constants';
// import LoginContainer from './containers/LoginContainer';
import GlobalStyle from './GlobalStyle';
import apolloClient from './util/apolloClient';
// import { Button } from './components/Common';

// <Route exact={true} path={ROUTES.login} component={LoginContainer} />

import { theme } from './theme';
import ForgotPasswordForm from './components/Forms/Auth/ForgotPassword';

const App = () => (
  <Fragment>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <ApolloProvider client={apolloClient}>
        <Router>
          <Box>
            <Button variant="aTest">A TEST</Button>
            <Button variant="primary">PRIMARY</Button>
            <ForgotPasswordForm
              onLoginClick={() => {}}
              loading={false}
              message="moi"
            />
          </Box>
        </Router>
        <h1>Koira koira</h1>
      </ApolloProvider>
    </ThemeProvider>
  </Fragment>
);

export default App;
