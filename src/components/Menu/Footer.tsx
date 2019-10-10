import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Flex } from 'rebass';
import { Home } from 'styled-icons/boxicons-solid/Home';
import { PlusSquare } from 'styled-icons/boxicons-solid/PlusSquare';
import { User } from 'styled-icons/boxicons-solid/User';
import MenuBar from './MenuBar';

const dimensions = {
  width: 26,
  height: 26,
};

interface IProps {
  onHomeClick: () => void;
  onProfileClick: () => void;
  onAddEventClick: () => void;
}

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

const Footer: FunctionComponent<IProps> = (props: IProps) => {
  const { onHomeClick, onProfileClick, onAddEventClick } = props;

  return (
    <MenuBar isFixedTop={false}>
      <Flex justifyContent="space-between" width="100%" mx={3}>
        <HomeIcon {...dimensions} onClick={onHomeClick} />
        <AddIcon {...dimensions} onClick={onAddEventClick} />
        <ProfileIcon {...dimensions} onClick={onProfileClick} />
      </Flex>
    </MenuBar>
  );
};

export default Footer;
