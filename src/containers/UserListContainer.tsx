import { useQuery } from '@apollo/react-hooks';
import React, { FunctionComponent } from 'react';
import { FallbackProps } from 'react-error-boundary';

import Loader from '../components/Loader';
import UserList from '../components/UserList';
import { USERS_QUERY } from '../gql';
import withSetHeaderTitle from '../hoc/withSetHeaderTitle';

const UserListContainer: FunctionComponent<FallbackProps> = props => {
  const { loading, error, data } = useQuery(USERS_QUERY);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <h1>Virhus</h1>;
  }

  const { users } = data;

  return <UserList users={users} />;
};

export default withSetHeaderTitle('käyttäjät')(UserListContainer);
