import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { FunctionComponent, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { TextLink } from '../components/Common';
import { Login } from '../components/Forms/Auth';
import { ROUTES } from '../constants';
import { setGraphQLErrors } from '../util/graphqlErrors';

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
  const [loginAction, { data, loading, error }] = useMutation(LOGIN_MUTATION);
  const [generalError, setGeneralError] = useState('');

  // TODO: check correct formik type
  const onSubmit = async (values: any, actions: any) => {
    try {
      await loginAction({ variables: values });
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

    console.log('data', data);
  };

  console.log('loading', loading);

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
