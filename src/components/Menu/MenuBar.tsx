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
      borderBottom: '1px solid lightgrey',
    };
  }
  return {
    ...common,
    bottom: 0,
    borderTop: '1px solid lightgrey',
  };
};

const MenuBar = (props: any) => (
  <Flex
    {...props}
    color="pink"
    bg="white"
    width="100%"
    alignItems="center"
    height={40}
    sx={getFixStyles(props.isFixedTop)}
  />
);

export default MenuBar;
