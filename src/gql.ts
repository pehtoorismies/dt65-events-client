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

export const DELETE_EVENT_MUTATION = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id)
  }
`;

export const TOGGLE_JOIN_EVENT = gql`
  mutation ToggleJoinEvent($id: ID!) {
    toggleJoinEvent(id: $id) {
      id
      participants {
        username
        id
      }
    }
  }
`;