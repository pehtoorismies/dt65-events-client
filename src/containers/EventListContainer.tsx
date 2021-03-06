import { useMutation } from '@apollo/react-hooks';
import compose from '@shopify/react-compose';
import append from 'ramda/es/append';
import equals from 'ramda/es/equals';
import findIndex from 'ramda/es/findIndex';
import map from 'ramda/es/map';
import propEq from 'ramda/es/propEq';
import remove from 'ramda/es/remove';
import replace from 'ramda/es/replace';
import isValid from 'date-fns/isValid';
import React, { Fragment, FunctionComponent, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Flex, Text } from 'rebass';
import useReactRouter from 'use-react-router';

import EventCard from '../components/EventCard';
import DateFilter from '../components/DateFilter';
import { QUERY_PARAMS, ROUTES } from '../constants';
import { DELETE_EVENT_MUTATION, EVENTS_QUERY, TOGGLE_JOIN_EVENT } from '../gql';
import withEvents, { IEventProps } from '../hoc/withEvents';
import {useUser} from '../hooks';
import { ID, IEvent } from '../types';
import { queryParamsFrom, dateFromQueryFilter, filterByDate } from '../util';

const findLoading = (id: ID, loadingEvents: ID[]): boolean => {
  const idx = findIndex(equals(id))(loadingEvents);
  return idx >= 0;
};

const EventListContainer: FunctionComponent<IEventProps> = (
  props:  IEventProps
) => {
  const { events, refetchEvents } = props;
  const user = useUser();
  const {
    history,
    location: { search },
  } = useReactRouter();

  // HOOKS
  const [loadingEventsList, setLoadingEventsList] = useState<ID[]>([]);

  const [toggleJoinEventMutation] = useMutation(
    TOGGLE_JOIN_EVENT
  );

  const [deleteEventMutation] = useMutation(DELETE_EVENT_MUTATION, {
    onError: () => {
      toast.warn('Poisto epäonnistui. Tapahtumaa ei löytynyt');
      // tslint:disable-next-line: no-floating-promises
      refetchEvents();
    },
    onCompleted: () => {
      toast.warn('Poisto onnistui.');
    },
    update: (
      cache,
      {
        data: {
          deleteEvent: { id },
        },
      }
    ) => {
      const resp: any = cache.readQuery({ query: EVENTS_QUERY });
      const cachedEvents = resp.findManyEvents;
      const idx = findIndex(propEq('id', id))(cachedEvents);
      const removed = remove(idx, 1, cachedEvents);

      cache.writeQuery({
        query: EVENTS_QUERY,
        data: { findManyEvents: removed },
      });
    },
  });

  // END HOOKS

  const date = dateFromQueryFilter(search);

  if (date && !isValid(date)) {
    const toEvents = () => history.push(ROUTES.home);
    return (
      <Flex flexDirection="column" alignItems="center">
        <Text mt={4} textAlign="center">
          Väärä päivämäärä-filtteri
        </Text>
        <Button onClick={toEvents} my={4}>
          Tapahtumiin
        </Button>
      </Flex>
    );
  }

  const filteredEvents = filterByDate(events, date);

  const toCreateEvent = () => history.push(ROUTES.createEvent);
  const joinEvent = async (eventId: ID) => {
    try {
      const updated = append(eventId, loadingEventsList);
      setLoadingEventsList(updated);
      await toggleJoinEventMutation({ variables: { id: eventId } });
    } catch (error) {
      console.error(error);
      toast.error('Toiminto ei onnistunut');
    } finally {
      const idx = findIndex(equals(eventId))(loadingEventsList);
      const removed = remove(idx, 1, loadingEventsList);
      setLoadingEventsList(removed);
    }
  };

  if (filteredEvents.length === 0) {
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
    // tslint:disable-next-line: no-floating-promises
    deleteEventMutation({ variables: { id: eventID } });
  };
  const onEditEvent = (eventId: ID) => {
    const url = replace(/:id/g, String(eventId), ROUTES.editEvent);
    history.push(`${url}?${queryParamsFrom(QUERY_PARAMS.VALUES.FROM.HOME)}`);
  };

  const eventCards = map((evt: IEvent) => {
    const isJoining = findLoading(evt.id, loadingEventsList);
    return (
      <EventCard
        key={evt.id}
        {...evt}
        isJoining={isJoining}
        user={user}
        joinEvent={joinEvent}
        onViewClick={onViewEvent}
        onDeleteClick={onDeleteEvent}
        onEditClick={onEditEvent}
      />
    );
  }, filteredEvents);

  const gotoEvents = () => history.push(ROUTES.home);

  return (
    <Fragment>
      <DateFilter date={date} onClearDate={gotoEvents} />
      <Flex flexDirection="column" alignItems="center" width="100%">
        {eventCards}
      </Flex>
    </Fragment>
  );
};

export default compose(
  withEvents
)(EventListContainer);
