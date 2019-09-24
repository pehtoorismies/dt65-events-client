import { Field, Form, FormikProps } from 'formik';
import React, { FunctionComponent } from 'react';
import { Flex } from 'rebass';
import * as Yup from 'yup';
import { IAuthFormProps, IFormProps } from '../../../types';
import { BasicInput, Button } from '../../Common';
import BaseForm from './BaseForm';

interface IFormValues {
  usernameOrEmail: string;
  password: string;
}

const render = (formikBag: FormikProps<IFormValues>) => {
  const { isSubmitting } = formikBag;
  return (
    <Form>
      <Flex flexDirection="column" alignItems="center">
        <Field
          width="100%"
          name="usernameOrEmail"
          placeholder="Käyttäjätunnus tai sähköpostiosoite*"
          component={BasicInput}
        />
        <Field
          width="100%"
          name="password"
          type="password"
          placeholder="Salasana*"
          component={BasicInput}
        />
        <Button
          width="100%"
          variant="primary"
          m={2}
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Kirjaudu
        </Button>
      </Flex>
    </Form>
  );
};

const validationSchema = Yup.object().shape({
  usernameOrEmail: Yup.string().required('Pakollinen kenttä'),
  password: Yup.string().required('Pakollinen kenttä'),
});
const initialValues = {
  usernameOrEmail: '',
  password: '',
};

export const LoginForm: FunctionComponent<IAuthFormProps> = (
  props: IAuthFormProps
) => {
  const formProps: IFormProps = {
    validationSchema,
    render,
    initialValues,
  };

  return (
    <BaseForm {...props} heading="KIRJAUDU" formProps={formProps}>
      {props.children}
    </BaseForm>
  );
};

export default LoginForm;
