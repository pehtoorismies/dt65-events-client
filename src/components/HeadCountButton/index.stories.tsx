import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import HeadCountButton from './';

storiesOf('HeadCountButton', module).add('story', () => (
  <HeadCountButton count={65} onClick={action('Click')} highlighted={true} />
));
