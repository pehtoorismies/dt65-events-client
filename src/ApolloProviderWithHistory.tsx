import React, { FunctionComponent, ReactNode } from 'react';
import { ApolloProvider } from 'react-apollo';
import useReactRouter from 'use-react-router';

import createClient from './util/apolloClient';

interface IProps {
  children: ReactNode;
}

const ApolloProdiverWithHistory: FunctionComponent<IProps> = (
  props: IProps
) => {
  const { children } = props;
  const { history } = useReactRouter();
  const client = createClient(history);
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloProdiverWithHistory;
