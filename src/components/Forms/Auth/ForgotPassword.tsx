// @ts-ignore
import { Input } from '@rebass/forms';
import {
  Field,
  ErrorMessage,
  Form,
  Formik,
  FormikActions,
  FormikProps,
} from 'formik';

import React, { FunctionComponent } from 'react';
import { Box, Button, Flex, Heading } from 'rebass';
import * as Yup from 'yup';

import { omit } from 'ramda';
import { BasicInput, TextLink } from '../../Common';

interface ITestProps {
  placeholder: string;
}

interface IFormValues {
  email: string;
}

interface IProps {
  loading: boolean;
  message?: string;
  onLoginClick(arg?: any): void;
}

const onSubmit = (values: IFormValues, actions: FormikActions<IFormValues>) => {
  console.log({ values, actions });
  alert(JSON.stringify(values, null, 2));
  actions.setSubmitting(false);
};

const render = (formikBag: FormikProps<IFormValues>) => {
  const { isSubmitting } = formikBag;
  return (
    <Form>
      <Flex flexDirection="column" alignItems="center">
        <Field
          name="email"
          placeholder="Sähköpostiosoite*"
          component={BasicInput}
        />
        <Button variant="primary" m={2} type="submit" disabled={isSubmitting}>
          Lähetä linkki
        </Button>
      </Flex>
    </Form>
  );
};

const ValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Tarkista muoto')
    .required('Pakollinen kenttä'),
});

export const ForgotPasswordForm: React.FunctionComponent<IProps> = (
  props: IProps
) => {
  const { onLoginClick } = props;
  return (
    <Flex flexDirection="column">
      <Heading py={3} color="black" textAlign="center" fontWeight={700}>
        UNOHTUNUT SALASANA
      </Heading>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={onSubmit}
        render={render}
        validationSchema={ValidationSchema}
      />
      <TextLink onClick={onLoginClick} m={2} textAlign="center">
        Kirjatumiseen
      </TextLink>
    </Flex>
  );
};


export default ForgotPasswordForm;
