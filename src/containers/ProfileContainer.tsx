import React, { FunctionComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { withApollo, WithApolloClient } from 'react-apollo';
import compose from '@shopify/react-compose';
import { RouteComponentProps } from 'react-router';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Profile from '../components/Profile';
import { ROUTES } from '../constants';
import { User } from 'styled-icons/boxicons-regular/User';
import { GET_LOCALUSER } from '../gql';
import { logout } from '../util/auth';
import path from 'ramda/es/path';

interface IProps {
  id: number;
}

const FooterMenuContainer: FunctionComponent<WithApolloClient<RouteComponentProps>> = (
  props: (WithApolloClient<RouteComponentProps>)
) => {
  const { history, client } = props;
  console.log(client);


  const { data: userData } = useQuery(GET_LOCALUSER);

  const go = (route: string) => () => {
    history.push(route);
  };

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

  const username = path(['localUser', 'username'], userData);
  if (!username) {
    throw new Error('No user present');
  }

  return <Profile username={String(username)} buttons={buttons} />;
};

export default compose(
  withApollo,
  // @ts-ignore
  withRouter,
)(FooterMenuContainer);
