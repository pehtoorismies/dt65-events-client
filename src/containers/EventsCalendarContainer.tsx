import compose from '@shopify/react-compose';
import { getMonth, getYear } from 'date-fns/fp';
import map from 'ramda/es/map';
import replace from 'ramda/es/replace';
import React, { Fragment, FunctionComponent, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { Box } from 'rebass';

import EventCalendar from '../components/EventCalendar';
import { ROUTES } from '../constants';
import withEvents, { IEventProps } from '../hoc/withEvents';
import withUser, { IUserProps } from '../hoc/withUser';
import { ID, IYearMonth } from '../types';
import { formatICalEvent } from '../util/general';

const EventsCalendarContainer: FunctionComponent<
  RouteComponentProps & IUserProps & IEventProps
> = (props: RouteComponentProps & IUserProps & IEventProps) => {
  const {
    history,
    user: { username },
    events,
  } = props;

  const toCreateEvent = () => history.push(ROUTES.createEvent);

  const onViewEvent = (id: ID): void => {
    const url = replace(/:id/g, String(id), ROUTES.viewEvent);
    history.push(url);
  };

  const now = new Date();
  const start: IYearMonth = {
    year: getYear(now),
    monthIndex: getMonth(now),
  };
  const iCalEvents = map(formatICalEvent, events);

  return (
    <Box width="100%" mt="5px">
      <EventCalendar start={start} monthCount={12} events={iCalEvents} />
    </Box>
  );
};

export default compose(
  withUser,
  withEvents,
  // @ts-ignore
  withRouter
)(EventsCalendarContainer);
