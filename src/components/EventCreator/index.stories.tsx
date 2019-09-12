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
    <StepType
      setSelectedType={action('Select')}
      types={EVENT_TYPES}
      selectedType={EVENT_TYPES[1].type}
    />
  ))
  .add('Race - off', () => <RaceStep setRace={action('set')} />)
  .add('Race - yes', () => <RaceStep isRace={true} setRace={action('set')} />)
  .add('Race - no', () => <RaceStep isRace={false} setRace={action('set')} />)
  .add('Title', () => <TitleStep setTitles={action('Set titles')} />);
