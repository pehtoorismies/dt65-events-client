import React, { FunctionComponent, Fragment } from 'react';
import { IUserInfo } from '../../types';
import { Flex, Box, Text } from 'rebass';
import { Field, Form, FormikProps, Formik, FormikActions } from 'formik';
import { BasicInput, Button } from '../Common';
import * as Yup from 'yup';

interface IFormValues {
  name: string;
}

interface IProps {
  userInfo: IUserInfo;
  onSubmit: (name: string, setSubmitting: (submitting: boolean) => void) => void;
}

interface IRowProps {
  title: string;
  value: string;
}

const Row: FunctionComponent<IRowProps> = (props: IRowProps) => {
  const { title, value } = props;

  return (
    <Flex width="100%" flexDirection="column" my={2} bg="darkWhite" p={2}>
      <Text my={1} color="lightgray">
        {title}
      </Text>
      <Text color="standardBlack">{value}</Text>
    </Flex>
  );
};
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Pakollinen kenttä'),
});

const render = (formikBag: FormikProps<IFormValues>) => {
  const { isSubmitting } = formikBag;
  return (
    <Form>
      <Flex flexDirection="column" width="100%">
        <Text>Nimi:</Text>
        <Field
          width="100%"
          name="name"
          placeholder="Etunimi Sukunimi*"
          component={BasicInput}
        />

        <Button
          width="100%"
          variant="primary"
          my={2}
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Tallenna muutokset
        </Button>
      </Flex>
    </Form>
  );
};

const UserInfo: FunctionComponent<IProps> = (props: IProps) => {
  const { userInfo, onSubmit } = props;

  const { name, email, username } = userInfo;

  const onSubmitEvent = (
    values: IFormValues,
    actions: FormikActions<IFormValues>
  ) => {
    onSubmit(values.name, actions.setSubmitting);
  };

  return (
    <Fragment>
      <Box m={2} px={2} width="100%">
        <Text>Käyttäjäinfo:</Text>
        <Text fontSize={1} my={1}>
          Jos haluat muuttaa sähköpostia tai käyttäjätunnusta, lähetä postia
          hello@downtown65.com
        </Text>
        <Row title="Sähköposti" value={email} />
        <Row title="Käyttäjätunnus" value={username} />
      </Box>
      <Box width="100%" px={2}>
        <Formik
          initialValues={{ name }}
          onSubmit={onSubmitEvent}
          validationSchema={validationSchema}
          render={render}
        />
      </Box>
    </Fragment>
  );
};

export default UserInfo;
