import React, { FunctionComponent, useState } from 'react';
import { RightArrow } from 'styled-icons/boxicons-solid/RightArrow';
import { Button, Flex, Text } from 'rebass';
import styled from '@emotion/styled';

interface IProps {
  visible: boolean;
  onClick: any;
  type?: string;
}

const Arrow = styled(RightArrow)`
  height: 15px;
  width: 15px;
`;

const RightArrowButton = (props: any) => (
  <Button
    {...props}
    variant="outlinePrimary"
    m={1}
    width={150}
    sx={{ visibility: props.visible ? 'visible' : 'hidden' }}
  >
    <Flex alignItems="center" justifyContent="space-between">
      <Text>SEURAAVA</Text>
      <Arrow />
    </Flex>
  </Button>
);

// const RightArrowButton: FunctionComponent<IProps> = (props: IProps) => {
//   const { visible, onClick, type = 'button' } = props;
//   return (
//     <Button
//       onClick={onClick}
//       sx={{ visibility: visible ? 'visible' : 'hidden' }}
//       variant="outlinePrimary"
//       m={1}
//       width={150}
//       type={type}
//     >
//       <Flex alignItems="center" justifyContent="space-between">
//         <Text>SEURAAVA</Text>
//         <Arrow />
//       </Flex>
//     </Button>
//   );
// };

export default RightArrowButton;
