import gql from 'graphql-tag';

export const GET_LOCALUSER = gql`
  query LocalUser {
    localUser @client {
      id
      username
    }
  }
`;

export const EVENTS_QUERY = gql`
  query FindEvents($limit: Int) {
    findManyEvents(limit: $limit) {
      date
      description
      id
      race
      subtitle
      time
      title
      type
      updatedAt
      participants {
        username
        _id
      }
      creator {
        username
        _id
      }
    }
  }
`;