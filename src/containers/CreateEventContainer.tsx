import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import EventCreator from '../components/EventCreator';
import gql from 'graphql-tag';
import { GET_LOCALUSER } from '../gql';
import { IEventReq } from '../types';
import { date } from 'yup';

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

const EventsContainer = () => {
  const { loading: userLoading, error: userError, data: userData } = useQuery(
    GET_LOCALUSER
  );
  const [createEvent] = useMutation(CREATE_EVENT);

  if (userLoading) {
    return <h1>loading</h1>;
  }
  if (userError) {
    return <h1>error</h1>;
  }

  const {
    localUser: { username },
  } = userData;

  const eventCreator = async (evt: IEventReq) => {
    try {
      const resp = await createEvent({
        variables: {
          ...evt,
          date: evt.date.toISOString(),
          addMe: evt.creatorJoining,
        },
      });
      console.log(resp);
    } catch (error) {
      console.error(error);
    }
  };

  return <EventCreator createEvent={eventCreator} username={username} />;
};

export default EventsContainer;
