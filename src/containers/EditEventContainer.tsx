import { useMutation, useQuery } from '@apollo/react-hooks';
import compose from '@shopify/react-compose';
import gql from 'graphql-tag';
import path from 'ramda/es/path';
import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import EventWizard from '../components/EventWizard';
import { ROUTES } from '../constants';
import { EVENT_QUERY } from '../gql';
import withUser, { IUserProps } from '../hoc/withUser';
import { IEventReq } from '../types';
import { toEventState } from '../util/general';

const UPDATE_EVENT = gql`
  mutation UpdateEvent(
    $id: ID!
    $date: String!
    $description: String
    $race: Boolean!
    $time: String
    $subtitle: String
    $title: String!
    $type: String!
  ) {
    updateEvent(
      id: $id
      event: {
        date: $date
        description: $description
        race: $race
        subtitle: $subtitle
        time: $time
        title: $title
        type: $type
      }
    ) {
      id
    }
  }
`;

const EditEventContainer: FunctionComponent<
  RouteComponentProps & IUserProps
> = (props: RouteComponentProps & IUserProps) => {
  const {
    history,
    match,
    user: { username },
  } = props;

  const id = path(['params', 'id'], match);

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
      history.push(ROUTES.home);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <EventWizard
      applyEvent={applyEvent}
      username={username}
      editState={eventState}
    />
  );
};

export default compose(
  withUser,
  // @ts-ignore
  withRouter
)(EditEventContainer);
