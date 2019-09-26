import { storiesOf } from '@storybook/react';
import React from 'react';
import NotFound from './';
import { action } from '@storybook/addon-actions';

storiesOf('NotFound', module).add('story', () => (
  <NotFound  onGetMeOut={action('Exit')} />
));
