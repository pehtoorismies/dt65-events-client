import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { FunctionComponent, useState } from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { TextLink } from '../components/Common';
import { Login } from '../components/Forms/Auth';
import { ROUTES } from '../constants';
import { getLocalUser, login as authLogin } from '../util/auth';
import { setGraphQLErrors } from '../util/graphqlErrors';

const GET_LOCALUSER = gql`
  query LocalUser {
    localUser @client {
      id
      username
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation Login($usernameOrEmail: String!, $password: String!) {
    login(usernameOrEmail: $usernameOrEmail, password: $password) {
      accessToken
      idToken
      expiresIn
    }
  }
`;

const LoginContainer: FunctionComponent<RouteComponentProps> = (
  props: RouteComponentProps
) => {
  const { history } = props;
  const toForgotPassword = () => history.push(ROUTES.forgotPassword);
  const toRegister = () => history.push(ROUTES.register);
  const [generalError, setGeneralError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  const [loginAction, { data, loading, error }] = useMutation(LOGIN_MUTATION, {
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
        setGraphQLErrors(actions.setFieldError, setGeneralError, graphQLErrors);
      } else if (networkError) {
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
          state: { from: props.location },
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

export default withRouter(LoginContainer);