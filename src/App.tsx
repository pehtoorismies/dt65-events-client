import { ThemeProvider } from 'emotion-theming';
import React, { Fragment } from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Box } from 'rebass';

import EventsContainer from './containers/EventsContainer';
import HeaderMenuContainer from './containers/HeaderMenuContainer';

import { ROUTES } from './constants';
import ForgotPasswordContainer from './containers/ForgotPasswordContainer';
import LoginContainer from './containers/LoginContainer';
import RegisterContainer from './containers/RegisterContainer';
import GlobalStyle from './GlobalStyle';
import PrivateRoute from './PrivateRoute';
import apolloClient from './util/apolloClient';

import { theme } from './theme';

const App = () => (
  <Fragment>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <ApolloProvider client={apolloClient}>
        <Box py={40} px={2}>
          <Router>
            <HeaderMenuContainer />
            <PrivateRoute
              exact={true}
              path={ROUTES.home}
              component={EventsContainer}
            />
            <Route
              exact={true}
              path={ROUTES.login}
              component={LoginContainer}
            />
            <Route
              exact={true}
              path={ROUTES.forgotPassword}
              component={ForgotPasswordContainer}
            />
            <Route
              exact={true}
              path={ROUTES.register}
              component={RegisterContainer}
            />
          </Router>
        </Box>
      </ApolloProvider>
    </ThemeProvider>
  </Fragment>
);

export default App;
