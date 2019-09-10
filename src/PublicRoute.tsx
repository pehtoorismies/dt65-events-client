import React, { Fragment } from 'react';
import { Route, RouteProps } from 'react-router-dom';

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
        return (
          <Fragment>
            <Component {...props} />
          </Fragment>
        );
      }}
    />
  );
};

export default PublicRoute;
