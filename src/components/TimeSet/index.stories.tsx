import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import TimeSet from './';

storiesOf('TimeSet', module).add('story', () => (
  <TimeSet setTime={action('Set time')} />
));
