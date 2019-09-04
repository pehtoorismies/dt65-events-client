import { Formik } from 'formik';
import React, { FunctionComponent } from 'react';
import { Box, Flex, Heading, Text } from 'rebass';
import { TextLink } from '../../Common';
import { IFormProps } from '../../../types';

interface IProps {
  onSubmit: (value: any, actions: any) => any;
  errorMessage?: string;
  navLinkTitle: string;
  heading: string;
  formProps: IFormProps;
  onNavigateClick: () => any;
}

const renderError = (errorMessage?: string) => {
  if (!errorMessage) {
    return null;
  }
  return (
    <Box
      p={2}
      my={1}
      width="100%"
      alignSelf="center"
     
    >
      <Text textAlign="center" color="red">{errorMessage}</Text>
    </Box>
  );
};

export const BaseForm: FunctionComponent<IProps> = (props: IProps) => {
  const {
    heading,
    formProps,
    navLinkTitle,
    onSubmit,
    onNavigateClick,
    errorMessage,
  } = props;
  return (
    <Flex width="100%" alignItems="center" flexDirection="column">
      <Box width={[400, 500, 500]}>
        <Heading py={3} color="black" textAlign="center" fontWeight={700}>
          {heading}
        </Heading>
        {renderError(errorMessage)}
        <Formik {...formProps} onSubmit={onSubmit} />
        <TextLink onClick={onNavigateClick} m={2} textAlign="center">
          {navLinkTitle}
        </TextLink>
      </Box>
    </Flex>
  );
};

export default BaseForm;
