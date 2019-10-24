import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { FunctionComponent } from 'react';
import useReactRouter from 'use-react-router';

import { Button } from '../components/Common';
import InfoMessage from '../components/InfoMessage';
import { ROUTES } from '../constants';


const GET_REGISTER_EMAIL = gql`
  {
    registerEmail @client
  }
`;

const RegisterSuccessContainer: FunctionComponent = () => {
  const { history } = useReactRouter();
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

export default RegisterSuccessContainer;
