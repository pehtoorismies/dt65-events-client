import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { Register } from '../components/Forms/Auth';
import { ROUTES } from '../constants';

const onSubmit = (value: any, actions: any) => {
  console.log('v-----------------------alues', value);
};

const RegisterContainer: FunctionComponent<RouteComponentProps> = (
  props: RouteComponentProps
) => {
  const { history } = props;
  const onNavigateClick = () => history.push(ROUTES.login);
  return (
    <Register onSubmit={onSubmit} onNavigateClick={onNavigateClick} />
  );
};

export default withRouter(RegisterContainer);
