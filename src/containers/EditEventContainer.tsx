import { useMutation, useQuery } from '@apollo/react-hooks';
import compose from '@shopify/react-compose';
import path from 'ramda/es/path';
import React, { FunctionComponent } from 'react';
import { toast } from 'react-toastify';
import useReactRouter from 'use-react-router';

import EventWizard from '../components/EventWizard';
import { EVENT_QUERY, UPDATE_EVENT } from '../gql';
import withSetHeaderTitle from '../hoc/withSetHeaderTitle';
import withUser, { IUserProps } from '../hoc/withUser';
import { IEventReq } from '../types';
import { fromUrlFromQueryString, toEventState } from '../util/general';

const EditEventContainer: FunctionComponent<IUserProps> = (
  props: IUserProps
) => {
  const {
    user: { username },
  } = props;

  const {
    history,
    match,
    location: { search },
  } = useReactRouter();

  const id = path(['params', 'id'], match);
  const redirectTo = fromUrlFromQueryString(search, String(id));
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
      username={username}
      editState={eventState}
      onCancel={onCancel}
    />
  );
};

export default compose(
  withUser,
  withSetHeaderTitle('edit')
)(EditEventContainer);
