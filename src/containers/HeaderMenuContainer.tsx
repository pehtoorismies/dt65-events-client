import any from 'ramda/es/any';
import equals from 'ramda/es/equals';
import React from 'react';
import useReactRouter from 'use-react-router';

import { MenuHeader } from '../components/Menu';
import { ROUTES } from '../constants';
import { getPageHeader } from '../util';

const disabledPaths: string[] = [
  ROUTES.login,
  ROUTES.register,
  ROUTES.registerSuccess,
  ROUTES.forgotPassword,
  ROUTES.calendar,
  ROUTES.home,
];

const HeaderMenuContainer = () => {
  const { history, location } = useReactRouter();

  const locPath: string = location.pathname;
  const title = getPageHeader(locPath);

  const disableBack: boolean = any(equals(locPath))(disabledPaths);

  const goBack = () => history.goBack();

  return (
    <MenuHeader pageTitle={title} onBack={goBack} backDisabled={disableBack} />
  );
};

export default HeaderMenuContainer;
