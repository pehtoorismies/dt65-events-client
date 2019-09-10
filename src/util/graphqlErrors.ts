import forEach from 'ramda/es/forEach';

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
      setGeneralError(data.message);
    }
  }, errors);
};

export { setGraphQLErrors };
