import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { User } from 'styled-icons/boxicons-regular/User';
import Profile from './';

const buttons = [
  { id: 1, title: 'Profiili', onClick: action('Profile'), icon: User },
  { id: 2, title: 'Profiili', onClick: action('Profile'), icon: User },
  { id: 3, title: 'Profiili', onClick: action('Profile'), icon: User },
  { id: 4, title: 'Profiili', onClick: action('Profile'), icon: User },
];

storiesOf('Profile', module).add('story', () => (
  <Profile username="koira88" buttons={buttons} />
));
