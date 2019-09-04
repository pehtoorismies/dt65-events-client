import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { ForgotPassword, Login, Register } from './Auth';

storiesOf('Forms/Auth', module)
  .add('forgot password', () => (
    <ForgotPassword
      onNavigateClick={action('Click')}
      onSubmit={action('Submit')}
    />
  ))
  .add('forgot password - error message', () => (
    <ForgotPassword
      errorMessage="moi"
      onNavigateClick={action('Click')}
      onSubmit={action('Submit')}
    />
  ))
  .add('login', () => (
    <Login onNavigateClick={action('Click')} onSubmit={action('Submit')} />
  ))
  .add('register', () => (
    <Register onNavigateClick={action('Click')} onSubmit={action('Submit')} />
  ));
