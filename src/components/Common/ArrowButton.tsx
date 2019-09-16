import React, { FunctionComponent } from 'react';
import { Button, Flex, Text } from 'rebass';
import styled from '@emotion/styled'
import { RightArrow } from 'styled-icons/boxicons-solid/RightArrow';

interface IProps {
  title: string;
  onClick: any;
  icon: any;
}

const Arrow = styled(RightArrow)`
  color: white;
  height: 15px;
  width: 15px;
`;

const ArrowButton: FunctionComponent<IProps> = (props: IProps) => {
  const { title, onClick, icon } = props;

  const Icn = styled(icon)`
    color: white;
    height: 15px;
    width: 15px;
    margin-right: 6px;
  `;

  return (
    <Button my={1} onClick={onClick} variant="secondary" width="100%">
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <Icn />
          <Text>{title}</Text>
        </Flex>
        <Arrow />
      </Flex>
    </Button>
  );
};

export default ArrowButton;
