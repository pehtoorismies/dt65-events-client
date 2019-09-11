import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';

import Subscriptions from './';

const checkboxes = [
  { id: 1, title: 'Lähetä sähköposti, kun uusi tapahtuma on luotu', onChange: action('switch'), checked: true },
  { id: 1, title: 'Lähetä viikkoposti tapahtumista', onChange: action('switch'), checked: false },
  
];

storiesOf('Subscriptions', module).add('story', () => (
  <Subscriptions checkboxes={checkboxes} />
));
