import forEach from 'ramda/es/forEach';
import path from 'ramda/es/path';

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

export { setGraphQLErrors };
