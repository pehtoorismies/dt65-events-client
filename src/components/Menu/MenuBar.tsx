import React from 'react';
import { Flex } from 'rebass';
import { MEASURES } from '../../constants';

const common = {
  position: 'fixed',
  left: 0,
  zIndex: 3,
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

const getHeight = (isFixedTop: boolean) => {
  return isFixedTop ? MEASURES.headerHeight : MEASURES.footerHeight;
};

const MenuBar = (props: any) => (
  <Flex
    {...props}
    color="pink"
    bg="white"
    width="100%"
    alignItems="center"
    height={getHeight(props.isFixedTop)}
    sx={getFixStyles(props.isFixedTop)}
  />
);

export default MenuBar;
