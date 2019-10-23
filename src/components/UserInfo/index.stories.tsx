import { storiesOf } from '@storybook/react';
import React from 'react';
import UserInfo from '.';
import { action } from '@storybook/addon-actions';

const userInfo = {
  email: 'test@test.com',
  name: 'Kaleva Kikkinen',
  id: 'a1234',
  nickname: 'sikakoirala',
};

storiesOf('UserInfo', module).add('story', () => (
  <UserInfo userInfo={userInfo} onSubmit={action('Submit')} />
));
