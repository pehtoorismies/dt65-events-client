import gql from 'graphql-tag';

export const GET_LOCALUSER = gql`
  query LocalUser {
    localUser @client {
      id
      username
    }
  }
`;