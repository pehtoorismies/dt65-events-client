import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';

// import { BigInput, Button, Input, ErrorText } from './';
import { BigInput, Button, ErrorText } from './';

// storiesOf('Common/BigInput', module).add('value', () => (
//   <BigInput value="Moi"></BigInput>
// ));

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
// storiesOf('Common/Input', module).add('value', () => (
//   <Input value="Moi"></Input>
// )).add('placeholder', () => (
//   <Input value="" placeholder="This is placeholder"></Input>
// )).add('password', () => (
//   <Input value="sadfasfd" type="password" ></Input>
// ));
