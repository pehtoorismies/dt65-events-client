import React from 'react';
import { Flex } from 'rebass';

const common = {
  position: 'fixed',
  left: 0,
  zIndex: 2,
};

const getFixStyles = (isFixedTop: boolean) => {
  if (isFixedTop) {
    return {
      ...common,
      top: 0,
    };
  }
  return {
    ...common,
    bottom: 0,
  };
};

const MenuBar = (props: any) => (
  <Flex
    {...props}
    bg="white"
    width="100%"
    justifyContent="space-around"
    alignItems="center"
    height={40}
    sx={getFixStyles(props.isFixedTop)}
  />
);

export default MenuBar;
