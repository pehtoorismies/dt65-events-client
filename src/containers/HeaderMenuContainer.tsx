import { useQuery } from '@apollo/react-hooks';
import path from 'ramda/es/path';
import React, { ComponentType } from 'react';
import useReactRouter from 'use-react-router';

import { MenuHeader } from '../components/Menu';
import { GET_HEADER_TITLE } from '../gql';

const HeaderMenuContainer = () => {
  const { loading, error, data } = useQuery(GET_HEADER_TITLE);

  const title: string | undefined = path(['headerTitle'], data);
  const { history } = useReactRouter();

  const goBack = () => history.goBack();

  return <MenuHeader pageTitle={title} onBack={goBack} />;
};

export default HeaderMenuContainer;
