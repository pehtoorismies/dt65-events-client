import { storiesOf } from '@storybook/react';
import React from 'react';
import ViewChooser from '.';
import { action } from '@storybook/addon-actions';
import { VIEW } from '../../types';

storiesOf('ViewChooser', module).add('story', () => (
  <ViewChooser onChooseType={action('select type')} selectedView={VIEW.LIST} />
));
