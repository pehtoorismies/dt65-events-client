import { useQuery } from '@apollo/react-hooks';
import { ILocalUser } from '../types';
import { GET_LOCALUSER } from '../gql';

const useUser = (): ILocalUser => {
  const { loading, error, data } = useQuery(GET_LOCALUSER);

  const empty = {
    __typename: '',
    nickname: '',
    picture: '',
    sub: '',
    name: '',
  };

  if (loading) {
    return empty;
  }
  if (error) {
    console.error('User not found in GQL-cache');
    return empty;
  }

  const { localUser } = data;

  return localUser;
};

export { useUser };
