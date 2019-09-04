import { Field, Form, FormikProps } from 'formik';
import React, { FunctionComponent } from 'react';
import { Button, Flex } from 'rebass';
import * as Yup from 'yup';
import { BasicInput } from '../../Common';
import BaseForm from './BaseForm';
import { IFormProps, IAuthFormProps } from '../../../types';

interface IFormValues {
  emailOrUsername: string;
  password: string;
}

interface IProps {
  loading: boolean;
  message?: string;
  onLoginClick(arg?: any): void;
}

const render = (formikBag: FormikProps<IFormValues>) => {
  const { isSubmitting } = formikBag;
  return (
    <Form>
      <Flex width={[400, 500, 500]} flexDirection="column" alignItems="center">
        <Field
          width="100%"
          name="emailOrUsername"
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
  emailOrUsername: '',
  password: '',
};

export const ForgotPasswordForm: FunctionComponent<IAuthFormProps> = (
  props: IAuthFormProps
) => {
  const { onSubmit, errorMessage, onNavigateClick } = props;
  const formProps: IFormProps = {
    validationSchema,
    render,
    onSubmit,
    initialValues,
  };
  return (
    <BaseForm
      navLinkTitle="Salasana unohtunut?"
      onNavigateClick={onNavigateClick}
      heading="KIRJAUDU"
      formProps={formProps}
    />
  );
};

export default ForgotPasswordForm;
