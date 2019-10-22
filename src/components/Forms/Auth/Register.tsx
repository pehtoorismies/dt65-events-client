import { Field, Form, FormikProps } from 'formik';
import React, { FunctionComponent } from 'react';
import { Flex } from 'rebass';
import * as Yup from 'yup';
import { IAuthFormProps, IFormProps } from '../../../types';
import { BasicInput, Button } from '../../Common';
import BaseForm from './BaseForm';

interface IFormValues {
  email: string;
  nickname: string;
  password: string;
  name: string;
  registerSecret: string;
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
          name="nickname"
          placeholder="Käyttäjätunnus / Nick*"
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
          isLoading={isSubmitting}
        >
          Rekisteröidy
        </Button>
      </Flex>
    </Form>
  );
};
// .min(4, `Minini pituus on 4 kirjainta`)
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Tarkista sähköposti')
    .required('Pakollinen kenttä'),
  nickname: Yup.string()
    .min(3, 'Käyttäjätunnus on liian lyhyt')
    .max(15, 'Käyttäjätunnus on liian pitkä')
    .required('Pakollinen kenttä'),
  password: Yup.string()
    .min(8, 'Salasana on liian lyhyt')
    .required('Pakollinen kenttä'),
  name: Yup.string().required('Pakollinen kenttä'),
  registerSecret: Yup.string().required('Pakollinen kenttä'),
});
const initialValues = {
  email: '',
  nickname: '',
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
