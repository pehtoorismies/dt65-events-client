import React, { FunctionComponent, Fragment, useState } from 'react';
import { Button, Flex, Text } from 'rebass';
import gql from 'graphql-tag';
import { RouteComponentProps } from 'react-router';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import parseISO from 'date-fns/parseISO';
import EventCard from '../components/EventCard';
import { fromApiType, dateToString } from '../util/general';
import { ROUTES, EVENT_TYPES } from '../constants';
import { EVENTS_QUERY, GET_LOCALUSER } from '../gql';
import { ID } from '../types';
import append from 'ramda/es/append';
import findIndex from 'ramda/es/findIndex';
import equals from 'ramda/es/equals';
import remove from 'ramda/es/remove';
import path from 'ramda/es/path';

const TOGGLE_JOIN_EVENT = gql`
  mutation ToggleJoinEvent($eventId: ID!) {
    toggleJoinEvent(eventId: $eventId) {
      id
      participants {
        username
        _id
      }
    }
  }
`;

const findLoading = (id: ID, loadingEvents: ID[]): boolean => {
  const idx = findIndex(equals(id))(loadingEvents);
  return idx >= 0;
};

const EventsContainer: FunctionComponent<RouteComponentProps> = (
  props: RouteComponentProps
) => {
  const { history } = props;
  const [loadingEventsList, setLoadingEventsList] = useState<ID[]>([]);
  const {
    loading: eventsLoading,
    error: eventsError,
    data: eventsData,
  } = useQuery(EVENTS_QUERY);

  const { data: userData } = useQuery(GET_LOCALUSER);
  const [
    toggleJoinEventMutation,
    { error: errorJoin, loading: loadingJoin },
  ] = useMutation(TOGGLE_JOIN_EVENT);

  if (eventsLoading) {
    return <h1>loading</h1>;
  }
  if (eventsError) {
    console.error(eventsError);
    return <h1>Error</h1>;
  }
  const toCreateEvent = () => history.push(ROUTES.createEvent);
  const joinEvent = async (eventId: ID) => {
    try {
      const updated = append(eventId, loadingEventsList);
      setLoadingEventsList(updated);
      const resp = await toggleJoinEventMutation({ variables: { eventId } });
      const idx = findIndex(equals(eventId))(loadingEventsList);
      const removed = remove(1, idx, loadingEventsList);
      setLoadingEventsList(removed);
    } catch (error) {
      console.error(error);
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
  const username = path(['localUser', 'username'], userData);
  return (
    <Fragment>
      {events.map((evt: any) => {
        const e = {
          ...evt,
          creator: evt.creator.username,
          date: dateToString(parseISO(evt.date)),
          type: fromApiType(evt.type, EVENT_TYPES),
          participants: evt.participants.map((p: any) => ({
            ...p,
            id: p._id,
          })),
          isJoining: findLoading(evt.id, loadingEventsList),
        };

        return (
          <EventCard
            key={evt.id}
            {...e}
            username={username}
            joinEvent={joinEvent}
          />
        );
      })}
    </Fragment>
  );
};

export default withRouter(EventsContainer);
