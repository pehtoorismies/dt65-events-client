import compose from '@shopify/react-compose';
import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { FallbackProps } from 'react-error-boundary';

import ShowError from '../components/ShowError';
import { ROUTES } from '../constants';

const ShowErrorContainer: FunctionComponent<RouteComponentProps & FallbackProps> = (
  props: RouteComponentProps
) => {
  const { history } = props;

  const goHome = () => history.push(ROUTES.home);
  return <ShowError onGetMeOut={goHome} {...props} />;
};

export default compose(
  // @ts-ignore
  withRouter
)(ShowErrorContainer);
