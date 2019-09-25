import { useMutation, useQuery } from '@apollo/react-hooks';
import compose from '@shopify/react-compose';
import path from 'ramda/es/path';
import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';

import EventCard from '../components/EventCard';
import { EVENT_QUERY, TOGGLE_JOIN_EVENT } from '../gql';
import withUser, { IUserProps } from '../hoc/withUser';
import { parseEvent } from '../util/general';
import { ID } from '../types';

const ViewEventContainer: FunctionComponent<
  RouteComponentProps & IUserProps
> = (props: RouteComponentProps & IUserProps) => {
  const {
    history,
    match,
    user: { username },
  } = props;
  const id = path(['params', 'id'], match);

  const [toggleJoinEventMutation, { loading: loadingJoin }] = useMutation(
    TOGGLE_JOIN_EVENT
  );

  const joinEvent = async (eventId: ID) => {
    try {
      await toggleJoinEventMutation({ variables: { eventId } });
    } catch (error) {
      console.error(error);
    }
  };

  const {
    loading: loadingEvent,
    error: errorEvent,
    data: dataEvent,
  } = useQuery(EVENT_QUERY, {
    variables: { id },
  });

  if (loadingEvent) {
    return <h1>loading</h1>;
  }
  if (errorEvent) {
    console.error(errorEvent);
    return <h1>error</h1>;
  }

  const evt = parseEvent(dataEvent.findEvent);

  return (
    <EventCard
      key={evt.id}
      {...evt}
      username={username}
      stayOpened={true}
      joinEvent={joinEvent}
      isJoining={loadingJoin}
    />
  );
};

export default compose(
  withUser,
  // @ts-ignore
  withRouter
)(ViewEventContainer);
