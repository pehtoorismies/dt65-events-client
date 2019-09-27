import compose from '@shopify/react-compose';
import React, { FunctionComponent } from 'react';
import { withApollo, WithApolloClient } from 'react-apollo';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { User } from 'styled-icons/boxicons-regular/User';

import Profile from '../components/Profile';
import { ROUTES } from '../constants';
import withUser, { IUserProps } from '../hoc/withUser';
import { logout } from '../util/auth';

const ProfileContainer: FunctionComponent<
  WithApolloClient<RouteComponentProps & IUserProps>
> = (props: WithApolloClient<RouteComponentProps & IUserProps>) => {
  const {
    history,
    client,
    user: { username },
  } = props;

  // const go = (route: string) => () => {
  //   history.push(route);
  // };

  const buttons = [
    {
      id: 1,
      title: 'Logout',
      onClick: async () => {
        logout();
        await client.clearStore();
        history.push(ROUTES.login);
      },
      icon: User,
    },
  ];

  if (!username) {
    throw new Error('No user present');
  }

  return <Profile username={String(username)} buttons={buttons} />;
};

export default compose(
  withApollo,
  // @ts-ignore
  withRouter,
  withUser
)(ProfileContainer);
