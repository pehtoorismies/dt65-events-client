import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { FunctionComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Box, Button, Text } from 'rebass';
import InfoMessage from '../components/InfoMessage';
import { ROUTES } from '../constants';

const GET_REGISTER_EMAIL = gql`
  {
    registerEmail @client
  }
`;

const renderError = (errorMessage?: string) => {
  if (!errorMessage) {
    return null;
  }
  return (
    <Box p={2} my={1} width="100%" alignSelf="center">
      <Text textAlign="center" color="red">
        {errorMessage}
      </Text>
    </Box>
  );
};

const RegisterSuccessContainer: FunctionComponent<RouteComponentProps> = (
  props: RouteComponentProps
) => {
  const { history } = props;
  const toLogin = () => history.push(ROUTES.login);
  const { data } = useQuery(GET_REGISTER_EMAIL);
  return (
    <InfoMessage
      message={`Rekisteröityminen onnistui. Olet saanut vahvistusviestin sähköpostiisi ${data.registerEmail}. Klikkaa siellä olevaa linkkiä.`}
    >
      <Button onClick={toLogin} variant="secondary">
        Kirjautumiseen
      </Button>
    </InfoMessage>
  );
};

export default withRouter(RegisterSuccessContainer);
