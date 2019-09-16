import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import HeadCountButton from './';

storiesOf('HeadCountButton', module)
  .add('Participating', () => (
    <HeadCountButton
      count={65}
      onClick={action('Click')}
      isParticipating={true}
    />
  ))
  .add('Not participating', () => (
    <HeadCountButton
      count={65}
      onClick={action('Click')}
      isParticipating={false}
    />
  ))
  .add('Loading', () => (
    <HeadCountButton
      loading={true}
      count={65}
      onClick={action('Click')}
      isParticipating={true}
    />
  ));
