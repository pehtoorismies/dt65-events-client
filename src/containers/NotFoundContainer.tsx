import React, { FunctionComponent } from 'react';
import useReactRouter from 'use-react-router';

import ErrorPage from '../components/ErrorPage';
import { ROUTES } from '../constants';

const NotFoundContainer: FunctionComponent = () => {
  const { history } = useReactRouter();

  const goHome = () => history.push(ROUTES.home);

  return <ErrorPage onGetMeOut={goHome} />;
};

export default NotFoundContainer;
