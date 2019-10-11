import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { MenuFooter, MenuHeader } from '.';

storiesOf('Menus', module)
  .add('header', () => <MenuHeader onBack={action('Back')} />)
  .add('footer', () => (
    <MenuFooter
      onAddEventClick={action('Add event')}
      onHomeClick={action('Go home')}
      onProfileClick={action('Show profile')}
      onUserListClick={action('Show user list')}
    />
  ));
