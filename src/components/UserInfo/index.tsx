import { Field, Form, Formik, FormikActions, FormikProps } from 'formik';
import React, { Fragment, FunctionComponent } from 'react';
import { Box, Flex, Text } from 'rebass';
import * as Yup from 'yup';

import { IUpdateableUserInfo, IUserInfo } from '../../types';
import { BasicInput, Button } from '../Common';

interface IProps {
  userInfo: IUserInfo;
  onSubmit: (
    values: IUpdateableUserInfo,
    setSubmitting: (submitting: boolean) => void
  ) => void;
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

const render = (formikBag: FormikProps<IUpdateableUserInfo>) => {
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
        <Text>Nick:</Text>
        <Field
          width="100%"
          name="nickname"
          placeholder="Nickname*"
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

  const { name, email, nickname } = userInfo;

  const onSubmitEvent = (
    values: IUpdateableUserInfo,
    actions: FormikActions<IUpdateableUserInfo>
  ) => {
    onSubmit(values, actions.setSubmitting);
  };

  return (
    <Fragment>
      <Box m={2} px={2} width="100%">
        <Text>Käyttäjäinfo:</Text>
        <Text fontSize={1} my={1}>
          Jos haluat muuttaa sähköpostia, lähetä postia hello@downtown65.com
        </Text>
        <Row title="Sähköposti" value={email} />
      </Box>
      <Box width="100%" px={2}>
        <Formik
          initialValues={{ name, nickname }}
          onSubmit={onSubmitEvent}
          validationSchema={validationSchema}
          render={render}
        />
      </Box>
    </Fragment>
  );
};

export default UserInfo;
