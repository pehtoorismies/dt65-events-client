import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';

import FormField from './FormField';
import { ForgotPassword } from './Auth';

// storiesOf('Forms', module).add('form field', () => (
//   <FormField label="primary">Hello Button</FormField>
// ));
storiesOf('Forms/Auth', module).add('forgot password', () => (
  <ForgotPassword message="moi" onLoginClick={action('Click')} loading={true} />
));
