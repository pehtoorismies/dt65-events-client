import { useMutation } from '@apollo/react-hooks';
import React, { ComponentType, useEffect } from 'react';
import { SET_HEADER_TITLE } from '../gql';

const withSetHeaderTitle = (title: string) => <P extends {}>(
  WrappedComponent: ComponentType<P>
): ComponentType<P> => props => {
  
  const [headerMutation] = useMutation(SET_HEADER_TITLE, {});

  useEffect(() => {
    // tslint:disable-next-line: no-floating-promises
    headerMutation({
      variables: {
        headerTitle: title,
      },
    });
  }, []);

  return <WrappedComponent {...props} />;
};

export default withSetHeaderTitle;
