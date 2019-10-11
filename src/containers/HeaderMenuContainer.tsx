import { useQuery } from '@apollo/react-hooks';
import path from 'ramda/es/path';
import React, { ComponentType } from 'react';
import useReactRouter from 'use-react-router';

import { MenuHeader } from '../components/Menu';
import { GET_HEADER_TITLE } from '../gql';
import { ROUTES } from '../constants';

import any from 'ramda/es/any';
import equals from 'ramda/es/equals';

const disabledPaths: string[] = [
  ROUTES.login,
  ROUTES.register,
  ROUTES.registerSuccess,
  ROUTES.forgotPassword,
];

const HeaderMenuContainer = () => {
  const { data } = useQuery(GET_HEADER_TITLE);

  const title: string | undefined = path(['headerTitle'], data);
  const { history, location } = useReactRouter();

  const locPath: string = location.pathname;

  const disableBack: boolean = any(equals(locPath))(disabledPaths);

  const goBack = () => history.goBack();

  return (
    <MenuHeader pageTitle={title} onBack={goBack} backDisabled={disableBack} />
  );
};

export default HeaderMenuContainer;
