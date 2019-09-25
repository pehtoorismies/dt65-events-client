import gql from 'graphql-tag';

const EventFragment = gql`
  fragment BaseEvent on Event {
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
      id
    }
    creator {
      username
      id
    }
  }
`;

export const GET_LOCALUSER = gql`
  query LocalUser {
    localUser @client {
      id
      username
    }
  }
`;

export const EVENTS_QUERY = gql`
  query FindEvents($limit: Int) {
    findManyEvents(limit: $limit) {
      ...BaseEvent
    }
  }
  ${EventFragment}
`;

export const EVENT_QUERY = gql`
  query FindEvent($id: ID!) {
    findEvent(id: $id) {
      ...BaseEvent
    }
  }
  ${EventFragment}
`;

export const TOGGLE_JOIN_EVENT = gql`
  mutation ToggleJoinEvent($eventId: ID!) {
    toggleJoinEvent(eventId: $eventId) {
      id
      participants {
        username
        id
      }
    }
  }
`;