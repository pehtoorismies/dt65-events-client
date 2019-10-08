import 'react-toastify/dist/ReactToastify.css';

import { ThemeProvider } from 'emotion-theming';
import React, { Fragment } from 'react';
import ErrorBoundary from 'react-error-boundary';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Flex } from 'rebass';

import ApolloProvider from './ApolloProviderWithHistory';
import { ROUTES } from './constants';
import CreateEventContainer from './containers/CreateEventContainer';
import EditEventContainer from './containers/EditEventContainer';
import EventsContainer from './containers/EventsContainer';
import ForgotPasswordContainer from './containers/ForgotPasswordContainer';
import HeaderMenuContainer from './containers/HeaderMenuContainer';
import LoginContainer from './containers/LoginContainer';
import NotFoundContainer from './containers/NotFoundContainer';
import PreferencesContainer from './containers/PreferencesContainer';
import ProfileContainer from './containers/ProfileContainer';
import RegisterContainer from './containers/RegisterContainer';
import RegisterSuccessContainer from './containers/RegisterSuccessContainer';
import ShowErrorContainer from './containers/ShowErrorContainer';
import ViewEventContainer from './containers/ViewEventContainer';
import Dt65Route from './Dt65Route';
import GlobalStyle from './GlobalStyle';
import { theme } from './theme';

const myErrorHandler = (error: any, componentStack: string) => {
  // TODO: log errors
};

const App = () => (
  <Fragment>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <Router>
        <ApolloProvider>
          <Flex
            py={40}
            px={2}
            alignItems="center"
            flexDirection="column"
            width="100%"
          >
            <ErrorBoundary
              FallbackComponent={ShowErrorContainer}
              onError={myErrorHandler}
            >
              <HeaderMenuContainer />
              <Switch>
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
                  path={ROUTES.preferences}
                  component={PreferencesContainer}
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
