import { useQuery } from '@apollo/react-hooks';
import React, { ComponentType } from 'react';
import { GET_LOCALUSER } from '../gql';

export interface IUserProps {
  user: {
    username: string;
    id: string;
    picture?: string;
  };
}

const withUser = <P extends {}>(
  WrappedComponent: ComponentType<P>
): ComponentType<P> => props => {
  const { loading, error, data } = useQuery(GET_LOCALUSER);

  if (loading) {
    return <h1>loading</h1>;
  }
  if (error) {
    console.error('User not found in grapql cache');
    return <h1>User not found. Check props</h1>;
  }

  const { localUser } = data;

  return <WrappedComponent user={localUser} {...props} />;
};

export default withUser;
