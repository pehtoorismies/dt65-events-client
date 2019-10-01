import { storiesOf } from '@storybook/react';
import React from 'react';
import ErrorPage from '.';
import { action } from '@storybook/addon-actions';

storiesOf('ErrorPage', module).add('story', () => (
  <ErrorPage onGetMeOut={action('Exit')} />
));
