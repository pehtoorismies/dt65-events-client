import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { FunctionComponent } from 'react';
import { toast } from 'react-toastify';
import useReactRouter from 'use-react-router';

import { TextLink } from '../components/Common';
import { ForgotPassword } from '../components/Forms/Auth';
import { ROUTES } from '../constants';

const FORGOT_PASSWORD_MUTATION = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

const ForgotPasswordContainer: FunctionComponent = () => {
  const { history } = useReactRouter();
  const toLogin = () => history.push(ROUTES.login);
  const [forgotPasswordAction] = useMutation(FORGOT_PASSWORD_MUTATION);

  const onSubmit = async ({ email }: { email: string }) => {
    await forgotPasswordAction({ variables: { email } });
    toast.success(`Reset linkki lähetetty: ${email}`);
    history.push(ROUTES.login);
  };

  return (
    <ForgotPassword onSubmit={onSubmit}>
      <TextLink onClick={toLogin} m={3} textAlign="center">
        Kirjautumiseen
      </TextLink>
    </ForgotPassword>
  );
};

export default ForgotPasswordContainer;
