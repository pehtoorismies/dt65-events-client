import 'react-toastify/dist/ReactToastify.css';

import { css } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import React, { Fragment } from 'react';
import ErrorBoundary from 'react-error-boundary';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Flex } from 'rebass';

import ApolloProvider from './ApolloProviderWithHistory';
import { useSentry } from './config';
import { MEASURES, ROUTES } from './constants';
import CreateEventContainer from './containers/CreateEventContainer';
import EditEventContainer from './containers/EditEventContainer';
import EventCalendarViewContainer from './containers/EventCalendarViewContainer';
import EventListViewContainer from './containers/EventListViewContainer';
import ForgotPasswordContainer from './containers/ForgotPasswordContainer';
import HeaderMenuContainer from './containers/HeaderMenuContainer';
import LoginContainer from './containers/LoginContainer';
import NotFoundContainer from './containers/NotFoundContainer';
import PreferencesContainer from './containers/PreferencesContainer';
import ProfileContainer from './containers/ProfileContainer';
import RegisterContainer from './containers/RegisterContainer';
import RegisterSuccessContainer from './containers/RegisterSuccessContainer';
import ShowErrorContainer from './containers/ShowErrorContainer';
import UserInfoContainer from './containers/UserInfoContainer';
import UserListContainer from './containers/UserListContainer';
import ViewEventContainer from './containers/ViewEventContainer';
import WrappedToastContainer from './containers/WrappedToastContainer';
import Dt65Route from './Dt65Route';
import GlobalStyle from './GlobalStyle';
import { theme } from './theme';
import { initLogging } from './util/logging';

const errorHandler = initLogging(useSentry);

const App = () => (
  <Fragment>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <WrappedToastContainer
        autoClose={2000}
        progressClassName={css`
          height: 12px;
        `}
      />
      <Router>
        <ApolloProvider>
          <Flex
            py={MEASURES.headerHeight}
            px={2}
            alignItems="center"
            flexDirection="column"
            width="100%"
          >
            <ErrorBoundary
              FallbackComponent={ShowErrorContainer}
              onError={errorHandler}
            >
              <HeaderMenuContainer />
              <Switch>
                <Dt65Route
                  exact={true}
                  path={ROUTES.home}
                  component={EventListViewContainer}
                  privateRoute={true}
                />
                <Dt65Route
                  exact={true}
                  path={ROUTES.calendar}
                  component={EventCalendarViewContainer}
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
                  path={ROUTES.preferences}
                  component={PreferencesContainer}
                  privateRoute={true}
                />
                <Dt65Route
                  exact={true}
                  path={ROUTES.profileInfo}
                  component={UserInfoContainer}
                  privateRoute={true}
                />
                <Dt65Route
                  exact={true}
                  path={ROUTES.userList}
                  component={UserListContainer}
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
                <Dt65Route path="/*" component={NotFoundContainer} />
              </Switch>
            </ErrorBoundary>
          </Flex>
        </ApolloProvider>
      </Router>
    </ThemeProvider>
  </Fragment>
);

export default App;
