import { useMutation, useQuery } from '@apollo/react-hooks';
import compose from '@shopify/react-compose';
import append from 'ramda/es/append';
import equals from 'ramda/es/equals';
import findIndex from 'ramda/es/findIndex';
import propEq from 'ramda/es/propEq';
import map from 'ramda/es/map';
import remove from 'ramda/es/remove';
import replace from 'ramda/es/replace';
import React, { FunctionComponent, useState, Fragment } from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Flex, Text, Box } from 'rebass';

import ErrorPage from '../components/ErrorPage';
import EventCard from '../components/EventCard';
import Loader from '../components/Loader';
import { QUERY_PARAMS, ROUTES } from '../constants';
import { DELETE_EVENT_MUTATION, EVENTS_QUERY, TOGGLE_JOIN_EVENT } from '../gql';
import withUser, { IUserProps } from '../hoc/withUser';
import { ID, IEventResp, VIEW, IYearMonth, ICalEvent } from '../types';
import { parseEvent, queryParamsFrom, formatICalEvent } from '../util/general';
import ViewChooser from '../components/ViewChooser';
import EventCalendar from '../components/EventCalendar';
import { getYear, getMonth } from 'date-fns/fp';
import parseISO from 'date-fns/parseISO';

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
  const [view, setView] = useState<VIEW>(VIEW.LIST);

  const {
    loading: eventsLoading,
    error: eventsError,
    data: eventsData,
    refetch: refetchEvents,
  } = useQuery(EVENTS_QUERY);

  const [toggleJoinEventMutation, { error: errorJoin }] = useMutation(
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
    // tslint:disable-next-line: no-floating-promises
    deleteEventMutation({ variables: { id: eventID } });
  };
  const onEditEvent = (eventId: ID) => {
    const url = replace(/:id/g, String(eventId), ROUTES.editEvent);
    history.push(`${url}?${queryParamsFrom(QUERY_PARAMS.VALUES.FROM.HOME)}`);
  };

  const swapSelected = (viewType: VIEW) => {
    setView(viewType);
  };

  // TODO: parse events

  const renderList = () => {
    return (
      <Flex mt={40} flexDirection="column" alignItems="center" width="100%">
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

  const renderCalendar = () => {
    const now = new Date();
    const start: IYearMonth = {
      year: getYear(now),
      monthIndex: getMonth(now),
    };
    const evts = map(formatICalEvent, events);
    return (
      <Box width="100%" mt={40}>
        <EventCalendar start={start} monthCount={12} events={evts} />
      </Box>
    );
  };

  return (
    <Fragment>
      <Box sx={{ position: 'fixed', top: 40, left: 0, right: 0, zIndex: 2}}>
        <ViewChooser onChooseType={swapSelected} selectedView={view} />
      </Box>

      {view === VIEW.LIST ? renderList() : renderCalendar()}
    </Fragment>
  );
};

export default compose(
  withUser,
  // @ts-ignore
  withRouter
)(EventsContainer);
