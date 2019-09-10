import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { FunctionComponent, useState } from 'react';
import { BallBeat } from 'react-pure-loaders';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { Button } from 'rebass';
import { TextLink } from '../components/Common';
import { Register } from '../components/Forms/Auth';
import InfoMessage from '../components/InfoMessage';
import { ROUTES } from '../constants';
import { setGraphQLErrors } from '../util/graphqlErrors';

const SIGNUP_MUTATION = gql`
  mutation Signup(
    $email: String!
    $username: String!
    $name: String!
    $password: String!
    $registerSecret: String!
  ) {
    signup(
      email: $email
      username: $username
      name: $name
      registerSecret: $registerSecret
      password: $password
    ) {
      email
    }
  }
`;

const setFieldErrors = (setFieldError: any) => (error: any) => {
  const { name, data } = error;
  if (name === 'UserInputError') {
    const { field, message } = data;
    setFieldError(field, message);
  }
};

const RegisterContainer: FunctionComponent<RouteComponentProps> = (
  props: RouteComponentProps
) => {
  const { history } = props;
  const toLogin = () => history.push(ROUTES.login);

  const [signupAction, { loading }] = useMutation(
    SIGNUP_MUTATION
  );
  const [generalError, setGeneralError] = useState('');
  const [successEmail, setSuccessEmail] = useState('');

  const onSubmit = async (values: any, actions: any) => {
    try {
      const {
        data: {
          signup: { email },
        },
      } = await signupAction({ variables: values });
      setSuccessEmail(email);
    } catch (error) {
      const { graphQLErrors, networkError } = error;

      if (graphQLErrors) {
        setGraphQLErrors(actions.setFieldError, setGeneralError, graphQLErrors);
      } else if (networkError) {
        setGeneralError('Network problems');
      }
    } finally {
      actions.setSubmitting(false);
    }
  };

  if (!successEmail) {
    return (
      <InfoMessage
        message={`Rekisteröityminen onnistui. Olet saanut vahvistusviestin sähköpostiisi ${successEmail}. Klikkaa siellä olevaa linkkiä.`}
      >
        <Button onClick={toLogin} variant="secondary">Kirjautumiseen</Button>
      </InfoMessage>
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

export default withRouter(RegisterContainer);
