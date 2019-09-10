import { Formik } from 'formik';
import React, { FunctionComponent, ReactNode } from 'react';
import { Box, Flex, Heading, Text } from 'rebass';
import { IFormProps } from '../../../types';

interface IProps {
  onSubmit: (value: any, actions: any) => any;
  errorMessage?: string;
  heading: string;
  formProps: IFormProps;
  children: ReactNode;
}

const renderError = (errorMessage?: string) => {
  if (!errorMessage) {
    return null;
  }
  return (
    <Box p={2} my={1} width="100%" alignSelf="center">
      <Text textAlign="center" color="red">
        {errorMessage}
      </Text>
    </Box>
  );
};

const BaseForm: FunctionComponent<IProps> = (props: IProps) => {
  const { heading, formProps, onSubmit, errorMessage, children } = props;

  return (
    <Flex width="100%" alignItems="center" flexDirection="column">
      <Box width={['100%', 400, 400]}>
        <Heading py={3} color="black" textAlign="center" fontWeight={700}>
          {heading}
        </Heading>
        {renderError(errorMessage)}
        <Formik {...formProps} onSubmit={onSubmit} />
        {children}
      </Box>
    </Flex>
  );
};

export default BaseForm;
