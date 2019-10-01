import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { ApolloLink, from } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { toast } from 'react-toastify';

import { getAccessToken, getIdToken, getLocalUser, logout } from './auth';
import { ROUTES } from '../constants';
import prop from 'ramda/es/prop';
import path from 'ramda/es/path';

const authLink = new ApolloLink((operation, forward) => {
  const accessToken = getAccessToken();
  operation.setContext({
    headers: {
      authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  });
  // Call the next link in the middleware chain.
  return forward(operation);
});

const errorLinkWithHistory = (history: any) =>
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach((gqlError: any) => {
        const { message, locations, path, name } = gqlError;
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );

        if (name === 'JWTError') {
          logout();
          history.push(ROUTES.login);
          toast.warn(message);
          return;
        }
      });
    }
    // TODO: fix network errors
    if (networkError) {
      // const { name, response, statusCode, result } = networkError;
      const name = prop('name', networkError);

      if (name === 'ServerError') {
        const statusCode = path(['statusCode'], networkError);

        console.error(
          `[Network error]: Name: ${name}, Status code: ${statusCode}`
        );
      }

      console.error(networkError);
    }
  });

const inMemCache = new InMemoryCache();

const createClient = (history: any) => {
  const errorLink = errorLinkWithHistory(history);

  const client = new ApolloClient({
    link: from([
      authLink,
      errorLink,
      new HttpLink({ uri: process.env.REACT_APP_GRAPHQL_SERVER }),
    ]),
    cache: inMemCache,
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
  });

  inMemCache.writeData({
    data: {
      localUser: getLocalUser(getIdToken()),
    },
  });

  return client;
};

export default createClient;
