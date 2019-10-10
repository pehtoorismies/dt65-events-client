import { useQuery } from '@apollo/react-hooks';
import React, { ComponentType } from 'react';
import { GET_HEADER_TITLE } from '../gql';

import { MenuHeader } from '../components/Menu';
import path from 'ramda/es/path';

const HeaderMenuContainer = () => {
  const { loading, error, data } = useQuery(GET_HEADER_TITLE);

  const title: string | undefined = path(['headerTitle'], data);

  return <MenuHeader pageTitle={title} />;
};

export default HeaderMenuContainer;
