import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { Login } from '../components/Forms/Auth';
import { ROUTES } from '../constants';

const onSubmit = (value: any, actions: any) => {
  console.log('v-----------------------alues', value);
};

const LoginContainer: FunctionComponent<RouteComponentProps> = (
  props: RouteComponentProps
) => {
  const { history } = props;

  const onNavigateClick = () => history.push(ROUTES.forgotPassword);

  return <Login onSubmit={onSubmit} onNavigateClick={onNavigateClick} />;
};

export default withRouter(LoginContainer);
