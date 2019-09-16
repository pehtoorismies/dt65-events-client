import { storiesOf } from '@storybook/react';
import React from 'react';
import StepCounter from './';

storiesOf('StepCounter', module)
  .add('empty', () => <StepCounter total={6} completed={0} />)
  .add('full', () => <StepCounter total={5} completed={5} />)
  .add('mid', () => <StepCounter total={6} completed={3} />);
