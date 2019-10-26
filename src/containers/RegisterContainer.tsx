import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { FormikActions } from 'formik';
import gql from 'graphql-tag';
import toLower from 'ramda/es/toLower';
import React, { FunctionComponent, useState } from 'react';
import { BallBeat } from 'react-pure-loaders';
import { Redirect } from 'react-router';
import { toast } from 'react-toastify';
import useReactRouter from 'use-react-router';

import { TextLink } from '../components/Common';
import { Register } from '../components/Forms/Auth';
import { ROUTES } from '../constants';
import { setGraphQLErrors } from '../util/graphqlErrors';

interface IRegister {
  email: string;
  nickname: string;
  password: string;
  registerSecret: string;
  name: string;
}

interface IRegisterResp {
  email: string;
}

const SIGNUP_MUTATION = gql`
  mutation Signup(
    $email: String!
    $nickname: String!
    $name: String!
    $password: String!
    $registerSecret: String!
  ) {
    signup(
      email: $email
      nickname: $nickname
      name: $name
      registerSecret: $registerSecret
      password: $password
    ) {
      email
    }
  }
`;

const RegisterContainer: FunctionComponent = () => {
  const { history, location } = useReactRouter();
  const toLogin = () => history.push(ROUTES.login);
  const client = useApolloClient();

  const [signup, { loading }] = useMutation<
    { signup: IRegisterResp },
    IRegister
  >(SIGNUP_MUTATION);
  const [generalError, setGeneralError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const onSubmit = async (
    values: IRegister,
    actions: FormikActions<IRegister>
  ) => {
    try {
      const lowerCaseValues: IRegister = {
        ...values,
        email: toLower(values.email),
      };

      const { data } = await signup({ variables: lowerCaseValues });

      if (!data || !data.signup) {
        toast.error('System error');
        return;
      }
      const { email } = data.signup;
      client.writeData({ data: { registerEmail: email } });
      setRegisterSuccess(true);
    } catch (error) {
      console.error(error);
      const { graphQLErrors, networkError } = error;

      if (graphQLErrors) {
        console.error('ERRORS', graphQLErrors);

        setGraphQLErrors(actions.setFieldError, setGeneralError, graphQLErrors);
      } else if (networkError) {
        setGeneralError('Network problems');
      }
    } finally {
      actions.setSubmitting(false);
    }
  };

  if (registerSuccess) {
    return (
      <Redirect
        to={{
          pathname: ROUTES.registerSuccess,
          state: { from: location.pathname },
        }}
      />
    );
  }
  return (
    <Register onSubmit={onSubmit} errorMessage={generalError}>
      <BallBeat loading={loading} />
      <TextLink onClick={toLogin} m={3} textAlign="center">
        Kirjautumiseen
      </TextLink>
    </Register>
  );
};

export default RegisterContainer;
