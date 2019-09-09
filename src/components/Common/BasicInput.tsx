// @ts-ignore
import { Input } from '@rebass/forms';
import { FieldConfig, FieldProps } from 'formik';
import React, { Fragment, FunctionComponent } from 'react';
import { ErrorText } from '../Common';

type CustomInput = FieldConfig &
  FieldProps & {
    placeholder: string;
  };

const FormField: FunctionComponent<CustomInput> = (props: CustomInput) => {
  const {
    field,
    form: { touched, errors },
    type,
    placeholder,
  } = props;

  const hasError = touched[field.name] && errors[field.name];
  const style = hasError ? 'primary-error' : 'primary';
  return (
    <Fragment>
      <Input
        {...field}
        placeholder={placeholder}
        my={1}
        variant={style}
        type={type}
      />
      {touched[field.name] && errors[field.name] && (
        <ErrorText my={1}>{errors[field.name]}</ErrorText>
      )}
    </Fragment>
  );
};

export default FormField;
