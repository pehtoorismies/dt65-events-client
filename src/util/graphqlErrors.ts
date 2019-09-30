import forEach from 'ramda/es/forEach';
import path from 'ramda/es/path';
import { toast } from 'react-toastify';

const setGraphQLErrors = (
  setFieldError: any,
  setGeneralError: any,
  errors: any
) => {
  forEach((err: any) => {
    const { name, data } = err;
    if (name === 'UserInputError') {
      const { field, message } = data;
      setFieldError(field, message);
    }
    if (name === 'Auth0Error') {
      const internalMsg = path(
        ['data', 'internalData', 'error', 'message'],
        err
      );
      setGeneralError(internalMsg);
    }
  }, errors);
};

const handleError = (error: any) => {
  const { graphQLErrors, networkError } = error;
  if (graphQLErrors) {
    graphQLErrors.forEach((err: any) => {
      const { message, locations, path, name, data } = err;
      if (name === 'JWTError') {
        toast.warn('Kirjaudu uudelleen sisään');
      }
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
    // toast.warn('Yhteys ongelmia');
  }
};

export { setGraphQLErrors, handleError };
