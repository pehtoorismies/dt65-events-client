import { useQuery } from '@apollo/react-hooks';
import compose from '@shopify/react-compose';
import path from 'ramda/es/path';
import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';

import { EVENT_QUERY } from '../gql';
import withUser, { IUserProps } from '../hoc/withUser';

const ViewEventContainer: FunctionComponent<
  RouteComponentProps & IUserProps
> = (props: RouteComponentProps & IUserProps) => {
  const { history, match, user } = props;
  const id = path(['params', 'id'], match);
  console.log(user);

  const { loading, error, data } = useQuery(EVENT_QUERY, {
    variables: { id },
  });

  return <h1>{loading}</h1>;
};

export default compose(
  withUser,
  // @ts-ignore
  withRouter
)(ViewEventContainer);
