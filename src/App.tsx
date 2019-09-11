import { ThemeProvider } from 'emotion-theming';
import React, { Fragment } from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router } from 'react-router-dom';
import { Box } from 'rebass';

import EventsContainer from './containers/EventsContainer';
import HeaderMenuContainer from './containers/HeaderMenuContainer';

import { ROUTES } from './constants';
import ForgotPasswordContainer from './containers/ForgotPasswordContainer';
import LoginContainer from './containers/LoginContainer';
import RegisterContainer from './containers/RegisterContainer';
import RegisterSuccessContainer from './containers/RegisterSuccessContainer';
import GlobalStyle from './GlobalStyle';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
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
            
            <PublicRoute
              exact={true}
              path={ROUTES.login}
              component={LoginContainer}
            />
            <PublicRoute
              exact={true}
              path={ROUTES.forgotPassword}
              component={ForgotPasswordContainer}
            />
            <PublicRoute
              exact={true}
              path={ROUTES.register}
              component={RegisterContainer}
            />
            <PublicRoute
              exact={true}
              path={ROUTES.registerSuccess}
              component={RegisterSuccessContainer}
            />
          </Router>
        </Box>
      </ApolloProvider>
    </ThemeProvider>
  </Fragment>
);

export default App;
