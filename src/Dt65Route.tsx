import React, { Fragment } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { ROUTES } from './constants';
import FooterMenuContainer from './containers/FooterMenuContainer';
import { isAuthenticated, logout } from './util/auth';

interface IPrivateRouteProps extends RouteProps {
  // tslint:disable-next-line:no-any
  component: any;
  privateRoute?: boolean;
}

const Dt65Route = (props: IPrivateRouteProps) => {
  const { component: Component, privateRoute = false, ...rest } = props;

  return (
    <Route
      {...rest}
      // tslint:disable-next-line: jsx-no-lambda
      render={(props: any) => {
        if (!privateRoute) {
          return <Fragment>
            <Component {...props} />
          </Fragment>;
        }

        const { valid, errorMessage } = isAuthenticated();

        if (valid) {
          return (
            <Fragment>
              <FooterMenuContainer />
              <Component {...props} />
            </Fragment>
          );
        }

        logout();

        return (
          <Redirect
            to={{
              pathname: ROUTES.login,
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};

export default Dt65Route;
