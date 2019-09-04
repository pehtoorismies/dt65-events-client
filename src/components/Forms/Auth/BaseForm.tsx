import { Formik } from 'formik';
import React, { FunctionComponent } from 'react';
import { Flex, Heading } from 'rebass';
import { TextLink } from '../../Common';
import { IFormProps } from '../../../types';

interface IProps {
  navLinkTitle: string;
  heading: string;
  formProps: IFormProps;
  onNavigateClick: () => any;
}

export const BaseForm: FunctionComponent<IProps> = (props: IProps) => {
  const { heading, formProps, navLinkTitle, onNavigateClick } = props;
  return (
    <Flex width="100%" alignItems="center" flexDirection="column">
      <Heading py={3} color="black" textAlign="center" fontWeight={700}>
        {heading}
      </Heading>
      <Formik {...formProps} />
      <TextLink onClick={onNavigateClick} m={2} textAlign="center">
        {navLinkTitle}
      </TextLink>
    </Flex>
  );
};

export default BaseForm;
