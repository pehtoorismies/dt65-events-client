import { useMutation, useQuery } from '@apollo/react-hooks';
import compose from '@shopify/react-compose';
import { withApollo, WithApolloClient } from 'react-apollo';
import React, { FunctionComponent } from 'react';
import { FallbackProps } from 'react-error-boundary';
import { toast } from 'react-toastify';
import useReactRouter from 'use-react-router';

import Loader from '../components/Loader';
import UserInfo from '../components/UserInfo';
import { ME_MUTATION, ME_QUERY } from '../gql';
import withSetHeaderTitle from '../hoc/withSetHeaderTitle';
import { IUpdateableUserInfo } from '../types';
import { ROUTES } from '../constants';
import { logout } from '../util/auth';

const UserInfoContainer: FunctionComponent<WithApolloClient<any>> = (
  props: WithApolloClient<any>
) => {
  const { client } = props;
  const { history } = useReactRouter();

  const { loading, error, data } = useQuery(ME_QUERY);
  const [updateMeMutation] = useMutation(ME_MUTATION, {});

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <h1>Virhus</h1>;
  }

  const { me } = data;

  const updateValues = async (
    values: IUpdateableUserInfo,
    setSubmitting: (submitting: boolean) => void
  ) => {
    try {
      const resp = await updateMeMutation({
        variables: values,
      });
      setSubmitting(false);
      toast.success('Päivitetty');

      const {
        data: {
          updateMe: { nickname },
        },
      } = resp;
      const oldNick = me.nickname;
      const updatedNick = nickname;
      if (oldNick !== updatedNick) {
        toast.success('Nickin päivitys vaatii uuden kirjatumisen');
        logout();
        await client.clearStore();
        history.push(ROUTES.login);
      }
    } catch (error) {
      toast.error('Päivitys epäonnistui');
      console.error(error);
    }
  };

  return <UserInfo userInfo={me} onSubmit={updateValues} />;
};

export default compose(
  withApollo,
  withSetHeaderTitle('profiili/tiedot')
)(UserInfoContainer);
