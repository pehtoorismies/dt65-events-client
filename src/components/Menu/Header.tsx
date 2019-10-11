import React, { FunctionComponent } from 'react';
import { Flex, Text } from 'rebass';
import styled from '@emotion/styled';
import MenuBar from './MenuBar';
import { ArrowBack } from 'styled-icons/boxicons-regular/ArrowBack';
import { colors } from '../../theme';

interface IProps {
  pageTitle?: string;
  onBack: () => void;
}

const BackIcon = styled(ArrowBack)`
  color: ${colors.pink};
  height: 25px;
`;

const Header: FunctionComponent<IProps> = (props: IProps) => {
  const { pageTitle, onBack } = props;
  return (
    <MenuBar isFixedTop={true}>
      <Flex width="100%" justifyContent="space-between" alignItems="center">
        <Flex alignItems="center" ml={2}>
          <Flex sx={{ borderRadius: "50%"}} bg="darkWhite" p={1}>
            <BackIcon onClick={onBack}  />
          </Flex>
          
          <Text ml={3} fontWeight="bold">
            Downtown65.events
          </Text>
        </Flex>

        <Text
          mr={3}
          textAlign="right"
          
          color="grey"
          fontFamily="monospace"
          fontSize={1}
        >
          /{pageTitle}
        </Text>
      </Flex>
    </MenuBar>
  );
};

export default Header;
