import React, { FunctionComponent } from 'react';
import { Text } from 'rebass';
import MenuBar from './MenuBar';

const Header: FunctionComponent = () => {
  return (
    <MenuBar isFixedTop={true}>
      <Text>Downtown 65 Events</Text>
    </MenuBar>
  );
};

export default Header;
