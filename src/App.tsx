import { ThemeProvider } from 'emotion-theming';
import React, { Fragment } from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router } from 'react-router-dom';
import { Box } from 'rebass';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import EventsContainer from './containers/EventsContainer';
import ProfileContainer from './containers/ProfileContainer';
import CreateEventContainer from './containers/CreateEventContainer';
import HeaderMenuContainer from './containers/HeaderMenuContainer';

import { ROUTES } from './constants';
import ForgotPasswordContainer from './containers/ForgotPasswordContainer';
import LoginContainer from './containers/LoginContainer';
import RegisterContainer from './containers/RegisterContainer';
import RegisterSuccessContainer from './containers/RegisterSuccessContainer';
import GlobalStyle from './GlobalStyle';
import Dt65Route from './Dt65Route';
import apolloClient from './util/apolloClient';

import { theme } from './theme';

// console.log(process.env.NODE_ENV)

const App = () => (
  <Fragment>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <ApolloProvider client={apolloClient}>
        <Box py={40} px={2}>
          <Router>
            <HeaderMenuContainer />
            <Dt65Route
              exact={true}
              path={ROUTES.home}
              component={EventsContainer}
              privateRoute={true}
            />
            <Dt65Route
              exact={true}
              path={ROUTES.createEvent}
              component={CreateEventContainer}
              privateRoute={true}
            />
            <Dt65Route
              exact={true}
              path={ROUTES.profile}
              component={ProfileContainer}
              privateRoute={true}
            />
            <Dt65Route
              exact={true}
              path={ROUTES.login}
              component={LoginContainer}
            />
            <Dt65Route
              exact={true}
              path={ROUTES.forgotPassword}
              component={ForgotPasswordContainer}
            />
            <Dt65Route
              exact={true}
              path={ROUTES.register}
              component={RegisterContainer}
            />
            <Dt65Route
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
