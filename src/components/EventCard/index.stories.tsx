import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
// @ts-ignore
import faker from 'faker';
import { times } from 'ramda';
import EventCard from './';
import { IParticipant } from '../../types';

const createParticipant = (id: number): IParticipant => {
  return {
    id: String(id),
    username: faker.internet.userName(),
  };
};

storiesOf('EventCard', module).add('story', () => (
  <EventCard
    type="Swimming"
    race={true}
    date={new Date()}
    time="10:00"
    title={faker.commerce.productName()}
    subtitle={faker.commerce.productName()}
    username="peelo"
    description={faker.lorem.paragraph()}
    participants={times(createParticipant, 12)}
  />
));
