import React, { FunctionComponent } from 'react';
import { Text } from 'rebass';
import MenuBar from './MenuBar';

const Header: FunctionComponent = () => {
  return (
    <MenuBar isFixedTop={true}>
      <Text fontWeight="bold">Downtown65.events</Text>
    </MenuBar>
  );
};

export default Header;
