import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import EventCreator from './';
import StepType from './steps/TypeStep';
import RaceStep from './steps/RaceStep';
import TitleStep from './steps/TitleStep';
import DateStep from './steps/DateStep';
import TimeStep from './steps/TimeStep';
import CreateStep from './steps/CreateStep';
import DescriptionStep from './steps/DescriptionStep';
import { EVENT_TYPES } from '../../constants';
import { IEventState } from '../../types';

storiesOf('EventCreator', module).add('Wizard', () => <EventCreator />);

const commonActions = {
  toNextStep: action('Next'),
  toPrevStep: action('Prev'),
};

const eventState: IEventState = {
  race: true,
  description: 'asdasda',
  title: 'Title',
  subtitle: 'sub title',
  timeEnabled: true,
  time: {
    minute: 20,
    hour: 19,
  },
  date: new Date(),
  type: EVENT_TYPES[0].type,
};

storiesOf('EventCreator/steps', module)
  .add('Type - none', () => (
    <StepType
      setSelectedType={action('Select')}
      types={EVENT_TYPES}
      
      
      {...commonActions}
    />
  ))
  .add('Type - selected', () => (
    <StepType
      setSelectedType={action('Select')}
      types={EVENT_TYPES}
      selectedType={EVENT_TYPES[1].type}
      
      {...commonActions}
    />
  ))
  .add('Race - off', () => (
    <RaceStep {...commonActions} setRace={action('set')} />
  ))
  .add('Race - yes', () => (
    <RaceStep {...commonActions} isRace={true} setRace={action('set')} />
  ))
  .add('Race - no', () => (
    <RaceStep {...commonActions} isRace={false} setRace={action('set')} />
  ))
  .add('Title', () => (
    <TitleStep {...commonActions} setTitles={action('Set titles')} />
  ))
  .add('Date', () => (
    <DateStep {...commonActions} setDate={action('Set date')} />
  ))
  .add('Date - preset', () => (
    <DateStep
      {...commonActions}
      date={new Date()}
      setDate={action('Set date')}
    />
  ))
  .add('Time - preset', () => (
    <TimeStep
      timeEnabled={false}
      setTimeEnabled={action('Enable')}
      {...commonActions}
      setTime={action('Set time')}
    />
  ))
  .add('Description', () => (
    <DescriptionStep
      {...commonActions}
      setDescription={action('Set description')}
    />
  ))
  .add('Create', () => (
    <CreateStep username="pertti" {...commonActions} eventState={eventState} />
  ));
