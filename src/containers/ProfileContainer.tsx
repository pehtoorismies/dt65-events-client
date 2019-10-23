import compose from '@shopify/react-compose';
import React, { FunctionComponent } from 'react';
import { withApollo, WithApolloClient } from 'react-apollo';
import { User } from 'styled-icons/boxicons-regular/User';
import { LogOut } from 'styled-icons/boxicons-regular/LogOut';
import { Subscriptions } from 'styled-icons/material/Subscriptions';
import { Profile as ProfileIcon } from 'styled-icons/icomoon/Profile';
import useReactRouter from 'use-react-router';

import Profile from '../components/Profile';
import { ROUTES } from '../constants';
import withSetHeaderTitle from '../hoc/withSetHeaderTitle';
import withUser, { IUserProps } from '../hoc/withUser';
import { logout } from '../util/auth';

const ProfileContainer: FunctionComponent<WithApolloClient<IUserProps>> = (
  props: WithApolloClient<IUserProps>
) => {
  const {
    client,
    user: { nickname, picture },
  } = props;

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

export default compose(
  withApollo,
  withUser,
  withSetHeaderTitle('asetukset')
)(ProfileContainer);
