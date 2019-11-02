import { useMutation } from '@apollo/react-hooks';
import { FormikActions } from 'formik';
import gql from 'graphql-tag';
import React, { FunctionComponent, useState } from 'react';
import { Redirect } from 'react-router';
import { toast } from 'react-toastify';
import useReactRouter from 'use-react-router';

import { TextLink } from '../components/Common';
import { Login as LoginComponent } from '../components/Forms/Auth';
import { useSentry } from '../config';
import { ROUTES } from '../constants';
import { GET_LOCALUSER } from '../gql';
import { getLocalUser, login as authLogin } from '../util/auth';
import { setGraphQLErrors } from '../util/graphqlErrors';
import { logUser } from '../util/logging';

interface ILogin {
  email: string;
  password: string;
}

interface ILoginResp {
  idToken: string;
  accessToken: string;
  expiresIn: number;
}

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      idToken
      expiresIn
    }
  }
`;

const LoginContainer: FunctionComponent = () => {
  const { history, location } = useReactRouter();
  const toForgotPassword = () => history.push(ROUTES.forgotPassword);
  const toRegister = () => history.push(ROUTES.register);
  const [generalError, setGeneralError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  const [login] = useMutation<{ login: ILoginResp }, ILogin>(LOGIN_MUTATION, {
    update(cache, { data }) {
      if (!data || !data.login) {
        toast.error('System error');
        return;
      }
      const { idToken, accessToken, expiresIn } = data.login;

      authLogin(idToken, accessToken, expiresIn);
      const lUser = getLocalUser(idToken);
      cache.writeQuery({
        query: GET_LOCALUSER,
        data: { localUser: lUser },
      });
      if (lUser) {
        logUser(useSentry, lUser);
      }
    },
  });

  // TODO: check correct formik type
  const onSubmit = async (values: ILogin, actions: FormikActions<ILogin>) => {
    try {
      await login({
        variables: values,
      });
      setLoginSuccess(true);
    } catch (e) {
      const { graphQLErrors, networkError } = e;
      if (graphQLErrors) {
        console.error('gQL', graphQLErrors);

        setGraphQLErrors(actions.setFieldError, setGeneralError, graphQLErrors);
      } else if (networkError) {
        console.error('networkError', networkError);
        setGeneralError('Network problems');
      }
    } finally {
      actions.setSubmitting(false);
    }
  };

  if (loginSuccess) {
    return (
      <Redirect
        to={{
          pathname: ROUTES.home,
          state: { from: location.pathname },
        }}
      />
    );
  }

  return (
    <LoginComponent onSubmit={onSubmit} errorMessage={generalError}>
      <TextLink onClick={toForgotPassword} m={3} textAlign="center">
        Salasana unohtunut?
      </TextLink>
      <TextLink onClick={toRegister} m={3} textAlign="center">
        Rekisteröitymiseen
      </TextLink>
    </LoginComponent>
  );
};

export default LoginContainer;
