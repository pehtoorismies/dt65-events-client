import React, { FunctionComponent } from 'react';
import { withApollo, WithApolloClient } from 'react-apollo';
import { LogOut } from 'styled-icons/boxicons-regular/LogOut';
import { Profile as ProfileIcon } from 'styled-icons/icomoon/Profile';
import { Subscriptions } from 'styled-icons/material/Subscriptions';
import useReactRouter from 'use-react-router';

import Profile from '../components/Profile';
import { ROUTES } from '../constants';
import { useUser } from '../hooks';
import { logout } from '../util/auth';

const ProfileContainer: FunctionComponent<WithApolloClient<{}>> = (
  props: WithApolloClient<{}>
) => {
  const {
    client,
    
  } = props;

  const { nickname, picture } = useUser();

  const { history } = useReactRouter();

  // const go = (route: string) => () => {
  //   history.push(route);
  // };

  const buttons = [
    {
      id: 2,
      title: 'Profiili',
      onClick: () => {
        history.push(ROUTES.profileInfo);
      },
      icon: ProfileIcon,
    },
    {
      id: 3,
      title: 'Sähköpostiasetukset',
      onClick: () => {
        history.push(ROUTES.preferences);
      },
      icon: Subscriptions,
    },
    {
      id: 21,
      title: 'Logout',
      onClick: async () => {
        logout();
        await client.clearStore();
        history.push(ROUTES.login);
      },
      icon: LogOut,
    },
  ];

  if (!nickname) {
    throw new Error('No user present');
  }

  return (
    <Profile
      nickname={String(nickname)}
      buttons={buttons}
      profileUrl={picture}
    />
  );
};

export default withApollo(ProfileContainer);
