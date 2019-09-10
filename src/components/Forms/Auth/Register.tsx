import { Field, Form, FormikProps } from 'formik';
import React, { FunctionComponent } from 'react';
import { Button, Flex } from 'rebass';
import * as Yup from 'yup';
import { IAuthFormProps, IFormProps } from '../../../types';
import { BasicInput } from '../../Common';
import BaseForm from './BaseForm';

interface IFormValues {
  email: string;
  username: string;
  password: string;
  name: string;
  registerSecret: string;
}

interface ILoaderProps {
  loading: boolean;
}

const render = (formikBag: FormikProps<IFormValues>) => {
  const { isSubmitting } = formikBag;
  return (
    <Form>
      <Flex flexDirection="column" alignItems="center">
        <Field
          width="100%"
          name="email"
          placeholder="Sähköpostiosoite*"
          component={BasicInput}
        />
        <Field
          width="100%"
          name="username"
          placeholder="Käyttäjätunnus*"
          component={BasicInput}
        />
        <Field
          width="100%"
          name="password"
          type="password"
          placeholder="Salasana*"
          component={BasicInput}
        />
        <Field
          width="100%"
          name="name"
          placeholder="Etunimi Sukunimi*"
          component={BasicInput}
        />
        <Field
          width="100%"
          name="registerSecret"
          placeholder="Saamasi rekisteröintikoodi*"
          component={BasicInput}
        />
        <Button
          width="100%"
          variant="primary"
          m={2}
          type="submit"
          disabled={isSubmitting}
        >
          Rekisteröidy
        </Button>
      </Flex>
    </Form>
  );
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Tarkista sähköposti')
    .required('Pakollinen kenttä'),
  username: Yup.string().required('Pakollinen kenttä'),
  password: Yup.string().required('Pakollinen kenttä'),
  name: Yup.string().required('Pakollinen kenttä'),
  registerSecret: Yup.string().required('Pakollinen kenttä'),
});
const initialValues = {
  email: '',
  username: '',
  password: '',
  name: '',
  registerSecret: '',
};

export const Register: FunctionComponent<IAuthFormProps> = (
  props: IAuthFormProps
) => {
  const formProps: IFormProps = {
    validationSchema,
    render,
    initialValues,
  };

  return (
    <BaseForm {...props} heading="REKISTERÖIDY" formProps={formProps}>
      {props.children}
    </BaseForm>
  );
};

export default Register;
