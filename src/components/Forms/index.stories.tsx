import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { ForgotPassword, Login, Register } from './Auth';

storiesOf('Forms/Auth', module)
  .add('forgot password', () => (
    <ForgotPassword onSubmit={action('Submit')}>Content</ForgotPassword>
  ))
  .add('forgot password - error message', () => (
    <ForgotPassword errorMessage="moi" onSubmit={action('Submit')}>
      Content
    </ForgotPassword>
  ))
  .add('login', () => <Login onSubmit={action('Submit')}>Content</Login>)
  .add('register', () => (
    <Register onSubmit={action('Submit')}>Content</Register>
  ));
