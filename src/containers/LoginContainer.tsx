import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { FunctionComponent, useState } from 'react';
import { Redirect } from 'react-router';
import useReactRouter from 'use-react-router';

import { TextLink } from '../components/Common';
import { Login } from '../components/Forms/Auth';
import { ROUTES } from '../constants';
import { GET_LOCALUSER } from '../gql';
import withSetHeaderTitle from '../hoc/withSetHeaderTitle';
import { getLocalUser, login as authLogin } from '../util/auth';
import { setGraphQLErrors } from '../util/graphqlErrors';

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

  const [loginAction] = useMutation(LOGIN_MUTATION, {
    update(
      cache,
      {
        data: {
          login: { idToken, accessToken, expiresIn },
        },
      }
    ) {
      authLogin(idToken, accessToken, expiresIn);

      cache.writeQuery({
        query: GET_LOCALUSER,
        data: { localUser: getLocalUser(idToken) },
      });
    },
  });

  // TODO: check correct formik type
  const onSubmit = async (values: any, actions: any) => {
    try {
      await loginAction({ variables: values });
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
    <Login onSubmit={onSubmit} errorMessage={generalError}>
      <TextLink onClick={toForgotPassword} m={3} textAlign="center">
        Salasana unohtunut?
      </TextLink>
      <TextLink onClick={toRegister} m={3} textAlign="center">
        Rekisteröitymiseen
      </TextLink>
    </Login>
  );
};

export default withSetHeaderTitle('kirjaudu')(LoginContainer);
