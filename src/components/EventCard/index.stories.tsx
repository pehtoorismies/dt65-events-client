import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
// @ts-ignore
import faker from 'faker';
import { times } from 'ramda';
import EventCard from './';
import { IUser, ID } from '../../types';
import { EVENT_TYPES } from '../../constants';

const rand = faker.random.number(EVENT_TYPES.length - 1);

const createParticipant = (id: number): IUser => {
  return {
    id: String(id),
    username: faker.internet.userName(),
    nickname: faker.internet.userName(),
    sub: String(id),
  };
};

const stories = storiesOf('EventCard', module);
const participants = times(createParticipant, faker.random.number(10) + 5);

const evtId: ID = 1;

const dummyUser = {
  picture: 'https://koira',
  name: 'Sika Simo',
};

const common = {
  id: evtId,
  joinEvent: action('join event'),
  date: '13.12.2021',
  title: faker.commerce.productName(),
  subtitle: faker.commerce.productName(),
  user: {
    ...dummyUser,
    nickname: 'peelo',
    sub: '123',
  },
  creator: 'koira',
  time: '10:00',
  description: `
    <p>p: ${faker.lorem.sentence()} 
      <strong>strong: ${faker.lorem.sentence()}</strong>
      <em>em: ${faker.lorem.sentence()}</em>
      <u>u: ${faker.lorem.sentence()}</u>
      <h1>h1: ${faker.lorem.sentence()}</h1>
    </p>
    <ol>
      <li> ${faker.lorem.word()}</li>
      <li> ${faker.lorem.word()}</li>
      <li> ${faker.lorem.word()}</li>
    </ol>
    <p>
      <ul>
        <li> ${faker.lorem.word()}</li>
        <li> ${faker.lorem.word()}</li>
        <li> ${faker.lorem.word()}</li>
      </ul>
    </p>
    `,
  participants,
  race: true,
  type: EVENT_TYPES[rand],
  onDeleteClick: action('Delete'),
  onEditClick: action('Edit'),
  onViewClick: action('View'),
};

const noRace = {
  ...common,
  race: false,
};

stories
  .add('not participant to race', () => <EventCard {...common} />)
  .add('not participant', () => <EventCard {...noRace} />)
  .add('participating', () => (
    <EventCard
      race={false}
      {...common}
      user={{ ...participants[0], ...dummyUser }}
    />
  ))
  .add('participating - stay open', () => (
    <EventCard
      stayOpened={true}
      race={false}
      {...common}
      user={{ ...participants[0], ...dummyUser }}
    />
  ));
