import { useMutation, useQuery } from '@apollo/react-hooks';
import React, { FunctionComponent } from 'react';
import { toast } from 'react-toastify';

import Preferences from '../components/Profile/Preferences';
import { PREFERENCES_QUERY, UPDATE_PREFERENCES_MUTATION } from '../gql';
import { IPreferences } from '../types';

const PreferencesContainer: FunctionComponent = () => {
  const {
    loading: loadingPreferences,
    error: errorPreferences,
    data: dataPreferences,
  } = useQuery(PREFERENCES_QUERY, {});

  const [
    updatePreferencesMutation,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(UPDATE_PREFERENCES_MUTATION, {
    onCompleted: () => {
      toast.success('Päitys onnistui');
    },
  });

  if (loadingPreferences) {
    return <h1>loading</h1>;
  }
  if (errorPreferences) {
    throw errorPreferences;
  }
  if (mutationError) {
    throw mutationError;
  }

  const {
    me: { preferences },
  } = dataPreferences;

  const onUpdate = async (prefs: IPreferences) => {
    try {
      await updatePreferencesMutation({
        variables: prefs,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const isLoading: boolean = loadingPreferences || mutationLoading;

  return (
    <Preferences
      preferences={preferences}
      onUpdate={onUpdate}
      loading={isLoading}
    />
  );
};

export default PreferencesContainer;
