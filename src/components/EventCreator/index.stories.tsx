import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import EventCreator from './';
import StepType from './steps/TypeStep';
import RaceStep from './steps/RaceStep';
import TitleStep from './steps/TitleStep';
import { EVENT_TYPES } from '../../constants';

storiesOf('EventCreator', module).add('Wizard', () => <EventCreator />);

storiesOf('EventCreator/steps', module)
  .add('Type', () => (
    <StepType types={EVENT_TYPES} preSelectedType={EVENT_TYPES[1].type} />
  ))
  .add('Race', () => <RaceStep preSelectedRace={true} />)
  .add('Title', () => <TitleStep />);
