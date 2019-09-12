import React, { FunctionComponent } from 'react';
import { Box, Text } from 'rebass';

interface IProps {
  title: string;
  children: React.ReactNode;
}

const BaseStep: FunctionComponent<IProps> = (props: IProps) => {
  const { title, children } = props;

  return (
    <Box width="100%" >
      <Text fontSize={[4, 5, 6]} textAlign="center" fontWeight="bold" my={2}>
        {title}
      </Text>
      {children}
    </Box>
  );
};

export default BaseStep;
