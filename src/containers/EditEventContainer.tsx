import { useMutation, useQuery } from '@apollo/react-hooks';
import compose from '@shopify/react-compose';
import gql from 'graphql-tag';
import path from 'ramda/es/path';
import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import EventWizard from '../components/EventWizard';
import { EVENT_QUERY, UPDATE_EVENT } from '../gql';
import withUser, { IUserProps } from '../hoc/withUser';
import { IEventReq } from '../types';
import { toEventState, fromUrlFromQueryString } from '../util/general';



const EditEventContainer: FunctionComponent<
  RouteComponentProps & IUserProps
> = (props: RouteComponentProps & IUserProps) => {
  const {
    history,
    match,
    location: { search },
    user: { username },
  } = props;

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

  const [updateEventQuery] = useMutation(UPDATE_EVENT);

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
      await updateEventQuery({
        variables: {
          ...evt,
          id,
        },
      });

      toast(`Tapahtuma päivitetty`);
      history.push(redirectTo);
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
  // @ts-ignore
  withRouter
)(EditEventContainer);
