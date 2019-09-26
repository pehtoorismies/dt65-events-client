import { useMutation, useQuery } from '@apollo/react-hooks';
import compose from '@shopify/react-compose';
import path from 'ramda/es/path';
import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import EventCard from '../components/EventCard';
import { ROUTES, QUERY_PARAMS } from '../constants';
import { DELETE_EVENT_MUTATION, EVENT_QUERY, TOGGLE_JOIN_EVENT } from '../gql';
import withUser, { IUserProps } from '../hoc/withUser';
import { ID } from '../types';
import { parseEvent, queryParamsFrom } from '../util/general';
import replace from 'ramda/es/replace';

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
  const [deleteEventMutation, { loading: loadingDelete }] = useMutation(
    DELETE_EVENT_MUTATION
  );
  
  const joinEvent = async (eventId: ID) => {
    try {
      await toggleJoinEventMutation({ variables: { id: eventId } });
    } catch (error) {
      console.error(error);
    }
  };
  const deleteEvent = async (eventID: ID) => {
    try {
      await deleteEventMutation({ variables: { id: eventID } });
      toast(`Tapahtuma poistettu`);
      history.push(ROUTES.home);
    } catch (error) {
      console.error(error);
    }
  };
  const editEvent = (eventId: ID) => {
    const url = replace(/:id/g, String(eventId), ROUTES.editEvent);
    history.push(`${url}?${queryParamsFrom(QUERY_PARAMS.VALUES.FROM.VIEW)}`);
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
      onDeleteClick={deleteEvent}
      onEditClick={editEvent}
    />
  );
};

export default compose(
  withUser,
  // @ts-ignore
  withRouter
)(ViewEventContainer);
