import { useMutation, useQuery } from '@apollo/react-hooks';
import React, { FunctionComponent } from 'react';
import { FallbackProps } from 'react-error-boundary';
import { toast } from 'react-toastify';
import useReactRouter from 'use-react-router';

import Loader from '../components/Loader';
import UserInfo from '../components/UserInfo';
import { ME_MUTATION, ME_QUERY } from '../gql';
import withSetHeaderTitle from '../hoc/withSetHeaderTitle';

const UserInfoContainer: FunctionComponent<FallbackProps> = props => {
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

  const updateName = async (
    name: string,
    setSubmitting: (submitting: boolean) => void
  ) => {
    try {
      await updateMeMutation({
        variables: {
          name,
        },
      });
      setSubmitting(false);
      toast.success('Päivitetty');
    } catch (error) {
      toast.error('Päivitys epäonnistui');
      console.error(error);
    }
  };

  return <UserInfo userInfo={me} onSubmit={updateName} />;
};

export default withSetHeaderTitle('profiili/tiedot')(UserInfoContainer);
