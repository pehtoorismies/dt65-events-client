import React, { FunctionComponent } from 'react';
import { Flex, Text } from 'rebass';
import styled, { css } from 'styled-components';
import { Home } from 'styled-icons/boxicons-solid/Home';
import { PlusSquare } from 'styled-icons/boxicons-solid/PlusSquare';
import { User } from 'styled-icons/boxicons-solid/User';
import MenuBar from './MenuBar';

const dimensions = {
  width: 26,
  height: 26,
};

interface IProps {}

const common = css`
  color: black;
`;

const HomeIcon = styled(Home)`
  ${common};
`;

const ProfileIcon = styled(User)`
  ${common};
`;

const AddIcon = styled(PlusSquare)`
  ${common};
`;

const Header: FunctionComponent<IProps> = (props: IProps) => {
  const {} = props;

  return (
    <MenuBar isFixedTop={true}>
      <Text>Downtown 65 Events</Text>
    </MenuBar>
  );
};

export default Header;
