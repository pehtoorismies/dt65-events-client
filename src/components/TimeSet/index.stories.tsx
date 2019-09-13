import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import TimeSet from './';

storiesOf('TimeSet', module)
  .add('enabled', () => (
    <TimeSet
      disabled={false}
      setTime={action('Set time')}
      time={{ minute: 2, hour: 14 }}
    />
  ))
  .add('disabled', () => (
    <TimeSet
      disabled={true}
      setTime={action('Set time')}
      time={{ minute: 2, hour: 14 }}
    />
  ));
