import { storiesOf } from '@storybook/react';
import React from 'react';
import InfoMessage from './';

storiesOf('InfoMessage', module).add('story', () => (
  <InfoMessage message="This is info message." />
));
