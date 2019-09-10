import React, { Fragment } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { ROUTES } from './constants';
import FooterMenuContainer from './containers/FooterMenuContainer';
import { isAuthenticated } from './util/auth';

interface IPrivateRouteProps extends RouteProps {
  // tslint:disable-next-line:no-any
  component: any;
}

const PrivateRoute = (props: IPrivateRouteProps) => {
  const { component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      // tslint:disable-next-line: jsx-no-lambda
      render={(props: any) => {
        if (isAuthenticated()) {
          return (
            <Fragment>
              <FooterMenuContainer />
              <Component {...props} />
            </Fragment>
          );
        }

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

export default PrivateRoute;
