import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';

import EventWizard from '.';
import { EVENT_TYPES } from '../../constants';
import { IEventState } from '../../types';
import CreateStep from './steps/CreateStep';
import DateStep from './steps/DateStep';
import DescriptionStep from './steps/DescriptionStep';
import RaceStep from './steps/RaceStep';
import TimeStep from './steps/TimeStep';
import TitleStep from './steps/TitleStep';
import StepType from './steps/TypeStep';

storiesOf('EventWizard', module).add('Wizard', () => (
  <EventWizard
    applyEvent={action('Create')}
    username="koira"
    onCancel={action('Cancel')}
  />
));

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
  creatorJoining: false,
  date: new Date(),
  type: EVENT_TYPES[0].id,
};

storiesOf('EventWizard/steps', module)
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
      selectedType={EVENT_TYPES[1].id}
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
    <CreateStep
      isEdit={false}
      username="pertti"
      {...commonActions}
      eventState={eventState}
      joinCreator={action('Toggle')}
    />
  ));
