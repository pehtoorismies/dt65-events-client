import React, { Fragment } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { ROUTES } from './constants';
import FooterMenuContainer from './containers/FooterMenuContainer';
import { isAuthenticated } from './util/auth';

interface IPublicRouteProps extends RouteProps {
  // tslint:disable-next-line:no-any
  component: any;
}

const PublicRoute = (props: IPublicRouteProps) => {
  const { component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      // tslint:disable-next-line: jsx-no-lambda
      render={(props: any) => {
        if (isAuthenticated()) {
          return (
            <Redirect
              to={{
                pathname: ROUTES.home,
                state: { from: props.location },
              }}
            />
          );
        }
        return (
          <Fragment>
            <FooterMenuContainer />
            <Component {...props} />
          </Fragment>
        );
      }}
    />
  );
};

export default PublicRoute;
