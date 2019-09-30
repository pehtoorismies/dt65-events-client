import ApolloClient from 'apollo-boost';
import { getAccessToken, getIdToken, getLocalUser, logout } from './auth';

const getAuthHeaders = () => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    return null;
  }
  return {
    Authorization: `Bearer ${accessToken}`,
  };
};

const client = new ApolloClient({
  headers: getAuthHeaders(),

  clientState: {
    defaults: {
      localUser: getLocalUser(getIdToken()),
    },
    resolvers: {
      Mutation: {
        logoutLocalUser: (_, variables, { cache }) => {
          logout();
          cache.writeData({
            data: {
              localUser: null,
            },
          });

          return null;
        },
      },
    },
    typeDefs: `
      type LocalUser {
        id: String!
        username: String!return null null
      }
      type Popup {
        visible: Boolean!
      }

      type Query {
        localUser: LocalUser 
      }
      type Mutation {
        logoutLocalUser: Boolean! 
      }
  `,
  },
  request: operation => {
    // console.log('OPERATION', operation);
    operation.setContext({ headers: getAuthHeaders() });
  },
  uri: process.env.REACT_APP_GRAPHQL_SERVER,
});

export default client;
