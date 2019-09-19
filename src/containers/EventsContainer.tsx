import React, { FunctionComponent } from 'react';
import { Button, Flex, Text } from 'rebass';
import gql from 'graphql-tag';
import { RouteComponentProps } from 'react-router';
import { useQuery } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import { ROUTES } from '../constants';

const EVENTS_QUERY = gql`
  query FindEvents($limit: Int) {
    findManyEvents(limit: $limit) {
      date
      description
      id
      race
      subtitle
      time
      title
      type
      updatedAt
      participants {
        username
        _id
      }
      creator {
        username
        _id
      }
    }
  }
`;

const EventsContainer: FunctionComponent<RouteComponentProps> = (
  props: RouteComponentProps
) => {
  const { history } = props;
  const { loading, error, data } = useQuery(EVENTS_QUERY);

  if (loading) {
    return <h1>loading</h1>;
  }
  if (error) {
    console.error(error);
    return <h1>Error</h1>;
  }
  const toCreateEvent = () => history.push(ROUTES.createEvent);
  const events = data.findManyEvents;
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

  return (
    <div>
      {events.map(
        (evt: any) => {
          console.log('evt', evt);
          return <h1>moi</h1>;
        }

        // return <Text key={evt.id}>{evt.title}</Text>
      )}

      <Text>EventsContainer</Text>
      <Text>EventsContainer</Text>
      <Text>EventsContainer</Text>
    </div>
  );
};

export default withRouter(EventsContainer);
