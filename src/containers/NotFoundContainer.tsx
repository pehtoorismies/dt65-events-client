import React, { FunctionComponent } from 'react';
import useReactRouter from 'use-react-router';

import ErrorPage from '../components/ErrorPage';
import { ROUTES } from '../constants';
import withSetHeaderTitle from '../hoc/withSetHeaderTitle';

const NotFoundContainer: FunctionComponent = () => {
  const { history } = useReactRouter();

  const goHome = () => history.push(ROUTES.home);

  return <ErrorPage onGetMeOut={goHome} />;
};

export default withSetHeaderTitle('404')(NotFoundContainer);
