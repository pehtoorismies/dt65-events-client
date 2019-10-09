import { useQuery } from '@apollo/react-hooks';
import React, { ComponentType } from 'react';
import { GET_LOCALUSER } from '../gql';
import ViewChooser from '../components/ViewChooser';
import { VIEW } from '../types';
import { Box } from 'rebass';

export interface IUserProps {
  user: {
    username: string;
    id: string;
    picture?: string;
  };
}

const withUser = <P extends {}>(
  WrappedComponent: ComponentType<P>
): ComponentType<P> => props => {
  const { loading, error, data } = useQuery(GET_LOCALUSER);

  if (loading) {
    return <h1>loading</h1>;
  }
  if (error) {
    console.error('User not found in grapql cache');
    return <h1>User not found. Check props</h1>;
  }

  const { localUser } = data;
  const onChooseType = (v: VIEW) => {};
  return (
    <Box >
      <Box sx={{ position: 'sticky',  top: 40 }}>
        <ViewChooser onChooseType={onChooseType} selectedView={VIEW.CALENDAR} />
      </Box>

      <WrappedComponent {...props} />
    </Box>
  );
};

export default withUser;
