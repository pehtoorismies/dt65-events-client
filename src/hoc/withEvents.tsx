import { useQuery } from '@apollo/react-hooks';
import map from 'ramda/es/map';
import React, { ComponentType } from 'react';

import ErrorPage from '../components/ErrorPage';
import Loader from '../components/Loader';
import { EVENTS_QUERY } from '../gql';
import { IEventExtended } from '../types';
import { parseEvent } from '../util/general';

export interface IEventProps {
  events: IEventExtended[];
  refetchEvents: () => any;
}

const withEvents = <P extends {}>(
  WrappedComponent: ComponentType<P>
): ComponentType<P> => props => {
  const {
    loading: eventsLoading,
    error: eventsError,
    data: eventsData,
    refetch: refetchEvents,
  } = useQuery(EVENTS_QUERY);

  if (eventsLoading) {
    return <Loader />;
  }
  if (eventsError) {
    const refresh = () => window.location.reload();
    return (
      <ErrorPage
        title="Virhe"
        buttonTitle="Lataa uudelleen"
        message="Tapahtumien latauksessa tapahtui virhe"
        onGetMeOut={refresh}
      />
    );
  }

  const { findManyEvents } = eventsData;

  const events: IEventExtended[] = map(parseEvent, findManyEvents);

  return (
    <WrappedComponent
      events={events}
      refetchEvents={refetchEvents}
      {...props}
    />
  );
};

export default withEvents;
