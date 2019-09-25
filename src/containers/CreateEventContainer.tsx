import { useMutation } from '@apollo/react-hooks';
import compose from '@shopify/react-compose';
import gql from 'graphql-tag';
import React, { FunctionComponent } from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import EventCreator from '../components/EventCreator';
import { ROUTES } from '../constants';
import withUser, { IUserProps } from '../hoc/withUser';
import { IEventReq } from '../types';

const CREATE_EVENT = gql`
  mutation CreateEvent(
    $addMe: Boolean!
    $date: String!
    $description: String
    $race: Boolean!
    $time: String
    $subtitle: String
    $title: String!
    $type: String!
  ) {
    createEvent(
      addMe: $addMe
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
      type
      participants {
        username
      }
      creator {
        username
      }
    }
  }
`;

const EventsContainer: FunctionComponent<RouteComponentProps & IUserProps> = (
  props: RouteComponentProps & IUserProps
) => {
  const {
    location,
    user: { username },
  } = props;

  const [createEventQuery] = useMutation(CREATE_EVENT, {
    // update(cache, { data: { createEvent } }) {
    //   const resp: any = cache.readQuery({ query: EVENTS_QUERY });
    //   console.log('update');
    //   console.log(resp);
    //   // const { findManyEvents } = resp;
    //   // cache.writeQuery({
    //   //   query: EVENTS_QUERY,
    //   //   data: { findManyEvents: findManyEvents.concat([createEvent]) },
    //   // });
    // },
  });

  const eventCreator = async (evt: IEventReq) => {
    try {
      const { data } = await createEventQuery({
        variables: {
          ...evt,
          date: evt.date.toISOString(),
          addMe: evt.creatorJoining,
        },
      });
      console.log(data);

      toast(`Tapahtuma luotu`);
      return (
        <Redirect
          to={{
            pathname: ROUTES.home,
            state: { from: location },
          }}
        />
      );
    } catch (error) {
      console.error(error);
    }
  };

  return <EventCreator createEvent={eventCreator} username={username} />;
};

export default compose(
  withUser,
  // @ts-ignore
  withRouter
)(EventsContainer);
