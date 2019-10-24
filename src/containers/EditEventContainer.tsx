import { useMutation, useQuery } from '@apollo/react-hooks';
import path from 'ramda/es/path';
import React, { FunctionComponent } from 'react';
import { toast } from 'react-toastify';
import useReactRouter from 'use-react-router';

import EventWizard from '../components/EventWizard';
import { EVENT_QUERY, UPDATE_EVENT } from '../gql';
import { useUser } from '../hooks';
import { IEventReq } from '../types';
import { routeFromQueryString, toEventState } from '../util';

const EditEventContainer: FunctionComponent = () => {
  const user = useUser();

  const {
    history,
    match,
    location: { search },
  } = useReactRouter();

  const id = path(['params', 'id'], match);
  const redirectTo = routeFromQueryString(search, String(id));
  const onCancel = () => {
    history.push(redirectTo);
  };

  const {
    loading: loadingEvent,
    error: errorEvent,
    data: dataEvent,
  } = useQuery(EVENT_QUERY, {
    variables: { id },
  });

  const [updateEventMutation] = useMutation(UPDATE_EVENT, {
    onCompleted: () => {
      history.push(redirectTo);
      toast(`Tapahtuma päivitetty`);
    },
  });

  if (loadingEvent) {
    return <h1>loading</h1>;
  }
  if (errorEvent) {
    console.error(errorEvent);
    return <h1>error</h1>;
  }

  const eventState = toEventState(dataEvent.findEvent);

  const applyEvent = async (evt: IEventReq) => {
    try {
      await updateEventMutation({
        variables: {
          ...evt,
          id,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <EventWizard
      applyEvent={applyEvent}
      nickname={user.nickname}
      editState={eventState}
      onCancel={onCancel}
    />
  );
};

export default EditEventContainer;
