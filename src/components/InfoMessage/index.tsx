import React, { FunctionComponent, ReactNode } from 'react';
import { Flex, Text } from 'rebass';

interface IProps {
  message: string;
  children?: ReactNode;
}

const InfoMessage: FunctionComponent<IProps> = (props: IProps) => {
  const { message, children } = props;

  return (
    <Flex
      flexDirection="column"
      sx={{ height: '90vh' }}
      alignItems="center"
      justifyContent="center"
    >
      <Text textAlign="center" lineHeight={1.5} p={3}>
        {message}
      </Text>
      {children}
    </Flex>
  );
};

export default InfoMessage;
