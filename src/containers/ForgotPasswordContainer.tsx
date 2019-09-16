import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { TextLink } from '../components/Common';
import { ForgotPassword } from '../components/Forms/Auth';
import { ROUTES } from '../constants';

const onSubmit = (value: any, actions: any) => {};

const ForgotPasswordContainer: FunctionComponent<RouteComponentProps> = (
  props: RouteComponentProps
) => {
  const { history } = props;
  const toLogin = () => history.push(ROUTES.login);

  return (
    <ForgotPassword onSubmit={onSubmit}>
      <TextLink onClick={toLogin} m={3} textAlign="center">
        Kirjautumiseen
      </TextLink>
    </ForgotPassword>
  );
};

export default withRouter(ForgotPasswordContainer);
