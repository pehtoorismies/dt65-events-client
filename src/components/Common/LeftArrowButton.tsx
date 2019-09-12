import React, { FunctionComponent, useState } from 'react';
import { LeftArrow } from 'styled-icons/boxicons-solid/LeftArrow';
import { Button, Flex, Text } from 'rebass';
import styled from '@emotion/styled';

interface IProps {
  visible: boolean;
  onClick: any;
}

const Arrow = styled(LeftArrow)`
  height: 15px;
  width: 15px;
`;

const RightArrowButton: FunctionComponent<IProps> = (props: IProps) => {
  const { visible, onClick } = props;
  return (
    <Button
      onClick={onClick}
      sx={{ visibility: visible ? 'visible' : 'hidden' }}
      variant="outlinePrimary"
      m={1}
      width={150}
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Arrow />
        <Text>EDELLINEN</Text>
      </Flex>
    </Button>
  );
};

export default RightArrowButton;
