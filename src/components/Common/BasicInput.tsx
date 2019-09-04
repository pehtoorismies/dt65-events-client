// @ts-ignore
import { Input } from '@rebass/forms';
import { FieldConfig, FieldProps } from 'formik';
import React, { FunctionComponent, Fragment } from 'react';
import { ErrorText } from '../Common';

type CustomInput = FieldConfig & FieldProps & any;

const FormField: FunctionComponent<CustomInput> = (props: CustomInput) => {
  const { field, form, type, placeholder, name } = props;
  const { touched, errors } = form;

  const hasError = touched[field.name] && errors[field.name];
  const style = hasError ? 'primary-error' : 'primary';

  return (
    <Fragment>
      <Input
        my={1}
        {...field}
        variant={style}
        type={type}
        placeholder={placeholder}
        name={name}
      />
      {touched[field.name] && errors[field.name] && (
        <ErrorText my={1}>{errors[field.name]}</ErrorText>
      )}
    </Fragment>
  );
};

export default FormField;
