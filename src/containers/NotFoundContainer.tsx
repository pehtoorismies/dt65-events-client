import compose from '@shopify/react-compose';
import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';

import ErrorPage from '../components/ErrorPage';
import { ROUTES } from '../constants';

interface IProps {
  id: number;
}

const NotFoundContainer: FunctionComponent<RouteComponentProps> = (
  props: RouteComponentProps
) => {
  const { history } = props;

  const goHome = () => history.push(ROUTES.home);

  return <ErrorPage onGetMeOut={goHome} />;
};

export default compose(
  // @ts-ignore
  withRouter
)(NotFoundContainer);
