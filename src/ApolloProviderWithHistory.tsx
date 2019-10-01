import React, { FunctionComponent, ReactNode } from 'react';
import { ApolloProvider } from 'react-apollo';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';

import createClient from './util/apolloClient';

interface IProps  {
  children: ReactNode;
}

const ApolloProdiverWithHistory: FunctionComponent<RouteComponentProps & IProps> = (
  props: RouteComponentProps & IProps
) => {
  const { children, history } = props;
  const client = createClient(history);
  return <ApolloProvider client={client}>{children}</ApolloProvider>
};

export default withRouter(ApolloProdiverWithHistory);
