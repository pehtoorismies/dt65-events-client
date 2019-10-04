import React, { Fragment, FunctionComponent, ReactNode } from 'react';
import { Box, Flex, Text } from 'rebass';
import styled from 'styled-components';
import { UserInjured } from 'styled-icons/fa-solid/UserInjured';
import { ArrowButton } from '../Common';
import { colors } from '../../theme';

interface IButton {
  id: string | number;
  title: string;
  icon: ReactNode;
  onClick(): void;
}

interface IProps {
  profileUrl?: string;
  username: string;
  children?: ReactNode;
  buttons: IButton[];
}

const ProfileIcon = styled(UserInjured)`
  color: grey;
  height: 30px;
  width: 30px;
  background: white;
  border-radius: 15px;
`;

const PictureIcon = styled.img`
  height: 35px;
  width: 35px;
  border-radius: 50%;
  border: 1px solid ${colors.pink};
`;

const getProfileCmp = (profileUrl?: string) => {
  if (!profileUrl) {
    return <ProfileIcon />;
  }
  return <PictureIcon src={profileUrl} />;
};

const Profile: FunctionComponent<IProps> = (props: IProps) => {
  const { buttons, profileUrl, username } = props;

  const Icon = getProfileCmp(profileUrl);

  return (
    <Box width="100%" sx={{ maxWidth: '500px'}}>
      <Flex
        width="100%"
        p={3}
        bg="lightestgray"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        {Icon}
        <Text
          fontWeight="bold"
          color="black"
          textAlign="center"
          lineHeight={1.5}
          p={1}
        >
          {username}
        </Text>
      </Flex>
      <Box width="100%" >
        {buttons.map((b: IButton) => (
          <ArrowButton
            key={b.id}
            title={b.title}
            onClick={b.onClick}
            icon={b.icon}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Profile;
