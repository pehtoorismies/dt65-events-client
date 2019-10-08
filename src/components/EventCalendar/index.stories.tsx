import { storiesOf } from '@storybook/react';
import React from 'react';
import EventCalendar from '.';
import { action } from '@storybook/addon-actions';
import { IYearMonth, ICalEvent, EventType } from '../../types';

const start: IYearMonth = { year: 2019, monthIndex: 9 };

const events: ICalEvent[] = [
  {
    date: new Date(2019, 9, 28),
    type: EventType.Running,
  },
  {
    date: new Date(2019, 11, 2),
    type: EventType.Ultras,
  },
  {
    date: new Date(2019, 11, 12),
    type: EventType.Orienteering,
  },
  {
    date: new Date(2019, 11, 31),
    type: EventType.Orienteering,
  },
  {
    date: new Date(2019, 11, 31),
    type: EventType.Orienteering,
  },
];

storiesOf('EventCalendar', module).add('story', () => (
  <EventCalendar start={start} monthCount={12} events={events} />
));
