import 'react-toastify/dist/ReactToastify.css';

import { ThemeProvider } from 'emotion-theming';
import React, { Fragment } from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Box } from 'rebass';

import { ROUTES } from './constants';
import CreateEventContainer from './containers/CreateEventContainer';
import EditEventContainer from './containers/EditEventContainer';
import EventsContainer from './containers/EventsContainer';
import ForgotPasswordContainer from './containers/ForgotPasswordContainer';
import HeaderMenuContainer from './containers/HeaderMenuContainer';
import LoginContainer from './containers/LoginContainer';
import ProfileContainer from './containers/ProfileContainer';
import RegisterContainer from './containers/RegisterContainer';
import RegisterSuccessContainer from './containers/RegisterSuccessContainer';
import ViewEventContainer from './containers/ViewEventContainer';
import Dt65Route from './Dt65Route';
import GlobalStyle from './GlobalStyle';
import { theme } from './theme';
import apolloClient from './util/apolloClient';

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
              path={ROUTES.viewEvent}
              component={ViewEventContainer}
              privateRoute={true}
            />
            <Dt65Route
              exact={true}
              path={ROUTES.editEvent}
              component={EditEventContainer}
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
