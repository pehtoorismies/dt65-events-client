import compose from '@shopify/react-compose';
import { getMonth, getYear } from 'date-fns/fp';
import map from 'ramda/es/map';
import React, { Fragment, FunctionComponent } from 'react';
import { Box } from 'rebass';
import useReactRouter from 'use-react-router';

import EventCalendar from '../components/EventCalendar';
import { ROUTES } from '../constants';
import withEvents, { IEventProps } from '../hoc/withEvents';
import { IYearMonth } from '../types';
import { formatICalEvent } from '../util/general';

const EventCalendarContainer: FunctionComponent<IEventProps> = (
  props: IEventProps
) => {
  const { events } = props;

  const { history } = useReactRouter();

  const now = new Date();
  const start: IYearMonth = {
    year: getYear(now),
    monthIndex: getMonth(now),
  };
  const iCalEvents = map(formatICalEvent, events);

  const selectDay = (formattedDate: string) => {
    history.push(`${ROUTES.home}?datefilter=${formattedDate}`);
  };

  return (
    <Fragment>
      <Box width="100%" mt="5px">
        <EventCalendar
          start={start}
          monthCount={13}
          events={iCalEvents}
          onSelectDay={selectDay}
        />
      </Box>
    </Fragment>
  );
};

export default compose(
  withEvents
)(EventCalendarContainer);
