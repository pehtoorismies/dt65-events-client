import { useMutation, useQuery } from '@apollo/react-hooks';
import path from 'ramda/es/path';
import replace from 'ramda/es/replace';
import React, { FunctionComponent } from 'react';
import { toast } from 'react-toastify';
import useReactRouter from 'use-react-router';
import { Helmet } from 'react-helmet';

import EventCard from '../components/EventCard';
import { QUERY_PARAMS, ROUTES } from '../constants';
import { DELETE_EVENT_MUTATION, EVENT_QUERY, TOGGLE_JOIN_EVENT } from '../gql';
import { useUser } from '../hooks';
import { ID } from '../types';
import { parseEvent, queryParamsFrom } from '../util';

const ViewEventContainer: FunctionComponent = () => {
  const { history, match } = useReactRouter();
  const user = useUser();

  const id = path(['params', 'id'], match);
  const [toggleJoinEventMutation, { loading: loadingJoin }] = useMutation(
    TOGGLE_JOIN_EVENT
  );
  const [deleteEventMutation] = useMutation(DELETE_EVENT_MUTATION);

  const onGotoLogin = () => {
    history.push('/');
  };

  const joinEvent = async (eventId: ID) => {
    try {
      await toggleJoinEventMutation({ variables: { id: eventId } });
    } catch (error) {
      toast.error('Toiminto ei onnistunut');
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
    context: {
      useAuthHeaders: false,
    },
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
    <React.Fragment>
      <Helmet>
        <title>DT65 tapahtuma: {evt.type.title}</title>
        <meta name="og:site_name" content="downtown65.events" />
        <meta name="og:title" content={evt.type.title} />
        <meta property="og:description" content={evt.title} />
        <meta
          property="og:image"
          content={`https://storage.googleapis.com/downtown65/events/${evt.type.apiType.toLowerCase()}.jpg`}
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <EventCard
        key={evt.id}
        {...evt}
        user={user}
        stayOpened={true}
        joinEvent={joinEvent}
        isJoining={loadingJoin}
        onDeleteClick={deleteEvent}
        onEditClick={editEvent}
        onGotoLogin={onGotoLogin}
      />
    </React.Fragment>
  );
};

export default ViewEventContainer;
