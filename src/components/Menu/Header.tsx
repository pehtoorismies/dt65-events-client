import React, { FunctionComponent } from 'react';
import { Flex, Text } from 'rebass';
import MenuBar from './MenuBar';

interface IProps {
  pageTitle?: string;
}

const Header: FunctionComponent<IProps> = (props: IProps) => {
  const { pageTitle } = props;
  return (
    <MenuBar isFixedTop={true}>
      <Flex width="100%">
        <Text ml={3} width="60%" fontWeight="bold">Downtown65.events</Text>
        <Text mr={3} textAlign="right" width="40%" color="grey" fontFamily="monospace" fontSize={1}>
          /{pageTitle}
        </Text>
      </Flex>
    </MenuBar>
  );
};

export default Header;
