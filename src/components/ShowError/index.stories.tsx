import { storiesOf } from '@storybook/react';
import React from 'react';
import ShowError from './';
import { action } from '@storybook/addon-actions';
// @ts-ignore
import faker from 'faker';

storiesOf('ShowError', module).add('story', () => (
  <ShowError
    error={new Error('test')}
    onGetMeOut={action('Exit')}
    componentStack={faker.lorem.paragraphs()}
  />
));
