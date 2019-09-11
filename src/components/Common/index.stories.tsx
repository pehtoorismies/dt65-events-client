import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { User } from 'styled-icons/boxicons-regular/User';
import { ArrowButton, Button, Checkbox, ErrorText } from './';

storiesOf('Common/Button', module)
  .add('primary', () => (
    <Button variant="primary" onClick={action('clicked')}>
      Hello Button
    </Button>
  ))
  .add('primary - disabled', () => (
    <Button disabled={true} variant="primary" onClick={action('clicked')}>
      Hello Button Disabled
    </Button>
  ))
  .add('outline', () => (
    <Button variant="outline" onClick={action('clicked')}>
      Hello Button
    </Button>
  ));
storiesOf('Common/Text', module).add('ErrorText', () => (
  <ErrorText>This is error</ErrorText>
));
storiesOf('Common/Misc', module)
  .add('Arrow Button', () => (
    <ArrowButton title="Arrow Button" icon={User} onClick={action('click')} />
  ))
  .add('Checkbox - on', () => (
    <Checkbox title="Arrow Button" onChange={action('click')} checked={true} />
  ))
  .add('Checkbox - off', () => (
    <Checkbox title="Arrow Button" onChange={action('click')} checked={false} />
  ));
