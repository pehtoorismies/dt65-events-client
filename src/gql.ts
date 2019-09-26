import gql from 'graphql-tag';

const EventFragment = gql`
  fragment AllEvent on Event {
    date
    description
    race
    subtitle
    time
    title
    type
    id
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
      ...AllEvent
    }
  }
  ${EventFragment}
`;

export const EVENT_QUERY = gql`
  query FindEvent($id: ID!) {
    findEvent(id: $id) {
      ...AllEvent
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

export const CREATE_EVENT = gql`
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
      ...AllEvent
    }
  }
  ${EventFragment}
`;

export const UPDATE_EVENT = gql`
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
      ...AllEvent
    }
  }
  ${EventFragment}
`;
