import { useMutation, useQuery } from '@apollo/react-hooks';
import compose from '@shopify/react-compose';
import append from 'ramda/es/append';
import equals from 'ramda/es/equals';
import findIndex from 'ramda/es/findIndex';
import remove from 'ramda/es/remove';
import replace from 'ramda/es/replace';
import React, {  FunctionComponent, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Flex, Text } from 'rebass';

import Loader from '../components/Loader';
import EventCard from '../components/EventCard';
import { QUERY_PARAMS, ROUTES } from '../constants';
import { DELETE_EVENT_MUTATION, EVENTS_QUERY, TOGGLE_JOIN_EVENT } from '../gql';
import withUser, { IUserProps } from '../hoc/withUser';
import { ID, IEventResp } from '../types';
import { parseEvent, queryParamsFrom } from '../util/general';
import { handleError } from '../util/graphqlErrors';

const findLoading = (id: ID, loadingEvents: ID[]): boolean => {
  const idx = findIndex(equals(id))(loadingEvents);
  return idx >= 0;
};

const EventsContainer: FunctionComponent<RouteComponentProps & IUserProps> = (
  props: RouteComponentProps & IUserProps
) => {
  const {
    history,
    user: { username },
  } = props;
  const [loadingEventsList, setLoadingEventsList] = useState<ID[]>([]);
  const {
    loading: eventsLoading,
    error: eventsError,
    data: eventsData,
  } = useQuery(EVENTS_QUERY);

  const [
    toggleJoinEventMutation,
    { error: errorJoin, loading: loadingJoin },
  ] = useMutation(TOGGLE_JOIN_EVENT);

  const [deleteEventMutation, { loading: loadingDelete }] = useMutation(
    DELETE_EVENT_MUTATION
  );


  if (eventsLoading) {
    return <Loader />  
  }
  if (eventsError) {
    handleError(eventsError)
    throw eventsError;
  }

  const toCreateEvent = () => history.push(ROUTES.createEvent);
  const joinEvent = async (eventId: ID) => {
    try {
      const updated = append(eventId, loadingEventsList);
      setLoadingEventsList(updated);
      await toggleJoinEventMutation({ variables: { id: eventId } });
    } catch (error) {
      console.error(error);
      toast.error('Toiminto ei onnistunut')
    } finally {
      const idx = findIndex(equals(eventId))(loadingEventsList);
      const removed = remove(1, idx, loadingEventsList);
      setLoadingEventsList(removed);
    }
  };

  const events = eventsData.findManyEvents;
  if (events.length === 0) {
    return (
      <Flex flexDirection="column" alignItems="center">
        <Text mt={4} textAlign="center">
          Ei tapahtumia.{' '}
        </Text>
        <Button onClick={toCreateEvent} my={4}>
          Luo uusi tapahtuma
        </Button>
      </Flex>
    );
  }

  const onViewEvent = (id: ID): void => {
    const url = replace(/:id/g, String(id), ROUTES.viewEvent);
    history.push(url);
  };

  const onDeleteEvent = async (eventID: ID) => {
    try {
      await deleteEventMutation({ variables: { id: eventID } });
      toast(`Tapahtuma poistettu`);
    } catch (error) {
      console.error(error);
    }
  };
  const onEditEvent = (eventId: ID) => {
    const url = replace(/:id/g, String(eventId), ROUTES.editEvent);
    history.push(`${url}?${queryParamsFrom(QUERY_PARAMS.VALUES.FROM.HOME)}`);
  };

  return (
    <Flex flexDirection="column" alignItems="center" width="100%">
      {events.map((evt: IEventResp) => {
        const e = {
          ...parseEvent(evt),
          isJoining: findLoading(evt.id, loadingEventsList),
        };

        return (
          <EventCard
            key={evt.id}
            {...e}
            username={username}
            joinEvent={joinEvent}
            onViewClick={onViewEvent}
            onDeleteClick={onDeleteEvent}
            onEditClick={onEditEvent}
          />
        );
      })}
    </Flex>
  );
};

export default compose(
  withUser,
  // @ts-ignore
  withRouter
)(EventsContainer);
