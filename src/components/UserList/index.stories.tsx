import { storiesOf } from '@storybook/react';
import React from 'react';
import UserList from '.';
import { action } from '@storybook/addon-actions';

const users = [
  {
    id: 's',
    name: 'sdaf fds',
    email: 'sdadsfadf adsf',
    username: 'dsaadsfasdf',
  },
  {
    id: 's1',
    name: 'sdaf fds',
    email: 'sdadsfadf adsf',
    username: 'dsaadsfasdf',
  },
];

storiesOf('UserList', module).add('story', () => <UserList users={users} />);
