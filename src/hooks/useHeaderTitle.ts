import { useMutation } from '@apollo/react-hooks';
import { useEffect, useState } from 'react';

import { SET_HEADER_TITLE } from '../gql';

const useSetHeaderTitle = (title: string) => {
  const [headerMutation] = useMutation(SET_HEADER_TITLE, {});
  useEffect(() => {
    // tslint:disable-next-line: no-floating-promises
    headerMutation({
      variables: {
        headerTitle: title,
      },
    });
  }, []);
};

export { useSetHeaderTitle };
