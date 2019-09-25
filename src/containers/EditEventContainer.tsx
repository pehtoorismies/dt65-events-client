import { useMutation, useQuery } from '@apollo/react-hooks';
import compose from '@shopify/react-compose';
import gql from 'graphql-tag';
import path from 'ramda/es/path';
import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';

import EventCreator from '../components/EventCreator';
import { EVENT_QUERY } from '../gql';
import withUser, { IUserProps } from '../hoc/withUser';
import { toEventState } from '../util/general';

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

const EditEventContainer: FunctionComponent<
  RouteComponentProps & IUserProps
> = (props: RouteComponentProps & IUserProps) => {
  const {
    location,
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

  if (loadingEvent) {
    return <h1>loading</h1>;
  }
  if (errorEvent) {
    console.error(errorEvent);
    return <h1>error</h1>;
  }

  const eventState = toEventState(dataEvent.findEvent);

  // const eventCreator = async (evt: IEventReq) => {
  //   try {
  //     await createEventQuery({
  //       variables: {
  //         ...evt,
  //         date: evt.date.toISOString(),
  //         addMe: evt.creatorJoining,
  //       },
  //     });

  //     toast(`Tapahtuma luotu`);
  //     return (
  //       <Redirect
  //         to={{
  //           pathname: ROUTES.home,
  //           state: { from: location },
  //         }}
  //       />
  //     );
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <EventCreator
      createEvent={() => {}}
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
