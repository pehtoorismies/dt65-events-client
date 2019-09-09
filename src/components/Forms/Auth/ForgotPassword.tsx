import { Field, Form, FormikProps } from 'formik';
import React, { FunctionComponent } from 'react';
import { Button, Flex } from 'rebass';
import * as Yup from 'yup';
import { IAuthFormProps, IFormProps } from '../../../types';
import { BasicInput } from '../../Common';
import BaseForm from './BaseForm';


interface IFormValues {
  email: string;
}

const render = (formikBag: FormikProps<IFormValues>) => {
  // console.log(formikBag);
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

        <Button
          width="100%"
          variant="primary"
          my={2}
          type="submit"
          disabled={isSubmitting}
        >
          Lähetä linkki
        </Button>
      </Flex>
    </Form>
  );
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Tarkista muoto')
    .required('Pakollinen kenttä'),
});
const initialValues = {
  email: '',
  password: '',
};

export const ForgotPasswordForm: FunctionComponent<IAuthFormProps> = (
  props: IAuthFormProps
) => {
  const formProps: IFormProps = {
    validationSchema,
    render,
    initialValues,
  };
  return (
    <BaseForm
      {...props}
      navLinkTitle="Kirjautumiseen"
      heading="UNOHTUNUT SALASANA"
      formProps={formProps}
    />
  );
};

export default ForgotPasswordForm;
