import React, { FunctionComponent } from 'react';
import { FallbackProps } from 'react-error-boundary';
import useReactRouter from 'use-react-router';

import ShowError from '../components/ShowError';
import { ROUTES } from '../constants';

const ShowErrorContainer: FunctionComponent<FallbackProps> = props => {
  const { history } = useReactRouter();

  const goHome = () => history.push(ROUTES.home);
  return <ShowError onGetMeOut={goHome} {...props} />;
};

export default ShowErrorContainer;
