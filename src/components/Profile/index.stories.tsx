import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { User } from 'styled-icons/boxicons-regular/User';
import Profile from './';
import Preferences from './Preferences';

const buttons = [
  { id: 1, title: 'Profiili', onClick: action('Profile'), icon: User },
  { id: 2, title: 'Profiili', onClick: action('Profile'), icon: User },
  { id: 3, title: 'Profiili', onClick: action('Profile'), icon: User },
  { id: 4, title: 'Profiili', onClick: action('Profile'), icon: User },
];

const preferences = {
  subscribeEventCreationEmail: true,
  subscribeWeeklyEmail: false,
};

storiesOf('Profile', module)
  .add('Profile', () => <Profile username="koira88" buttons={buttons} />)
  .add('Preferences', () => (
    <Preferences
      preferences={preferences}
      onUpdate={action('update')}
      loading={false}
    />
  ))
  .add('Preferences', () => (
    <Preferences
      loading={true}
      preferences={preferences}
      onUpdate={action('update')}
    />
  ));
