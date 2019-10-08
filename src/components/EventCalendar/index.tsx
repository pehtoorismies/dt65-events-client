import styled from '@emotion/styled';
import {
  formatWithOptions,
  getDay,
  getDaysInMonth,
  startOfMonth,
  addMonths,
  getYear,
  getMonth,
  getDate,
} from 'date-fns/fp';
import { fi } from 'date-fns/locale';
import map from 'ramda/es/map';
import pipe from 'ramda/es/pipe';
import times from 'ramda/es/times';
import filter from 'ramda/es/filter';
import React, { Fragment, FunctionComponent } from 'react';
import { Box, Flex, Text } from 'rebass';
import uuidv4 from 'uuid/v4';

import { WEEK_DAYS } from '../../constants';
import { colors } from '../../theme';
import { IYearMonth, ICalEvent, EventType } from '../../types';

interface IProps {
  start: IYearMonth;
  monthCount: number;
  events: ICalEvent[];
  topOffset?: number;
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 80px;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 40px;
`;

const renderHeader = (dayOfWeek: string) => {
  return (
    <Flex
      key={uuidv4()}
      color="white"
      alignItems="center"
      justifyContent="center"
      bg="blue"
    >
      {dayOfWeek}
    </Flex>
  );
};

const renderBlank = () => {
  return (
    <Flex
      key={uuidv4()}
      color="white"
      alignItems="center"
      justifyContent="center"
      bg="darkWhite"
    />
  );
};

const icons = {
  [EventType.Cycling]: 'PY',
  [EventType.Karonkka]: 'KA',
  [EventType.Meeting]: 'KO',
  [EventType.Orienteering]: 'SU',
  [EventType.Other]: 'MU',
  [EventType.Running]: 'JU',
  [EventType.Skiing]: 'HI',
  [EventType.Spinning]: 'SP',
  [EventType.Swimming]: 'UI',
  [EventType.TrackRunning]: 'RJ',
  [EventType.Triathlon]: 'TR',
  [EventType.Ultras]: 'UL',
};

const renderEventIcon = (evt: ICalEvent) => {
  return (
    <Text
      p={1}
      key={uuidv4()}
      color="blue"
      fontFamily="monospace"
      fontSize={12}
    >
      {icons[evt.type]}
    </Text>
  );
};

const renderDay = (monthEvents: ICalEvent[]) => (index: number) => {
  const filterByDay = (e: ICalEvent) => {
    return index + 1 === getDate(e.date);
  };

  const currentDayEvents = filter(filterByDay, monthEvents);
  const hasEvents = currentDayEvents.length > 0;

  return (
    <Flex
      p={1}
      flexDirection="column"
      key={uuidv4()}
      alignItems="center"
      justifyContent="flex-start"
      bg={hasEvents ? 'lightPink' : 'white'}
      sx={{ borderBottom: `1px solid ${colors.lightergray}` }}
    >
      <Text
        color={hasEvents ? 'standardBlack' : 'grey'}
        fontFamily="monospace"
        fontSize={1}
      >
        {index + 1}
      </Text>
      <Flex flexWrap="wrap" justifyContent="center" alignItems="center">
        {map(renderEventIcon, currentDayEvents)}
      </Flex>
    </Flex>
  );
};

const startOfMonthDay = pipe(
  startOfMonth,
  getDay
);

const renderMonth = (events: ICalEvent[]) => (yearMonth: IYearMonth) => {
  const { year, monthIndex } = yearMonth;
  const now = new Date(year, monthIndex);
  const d = startOfMonthDay(now);
  const daysInMonth = getDaysInMonth(now);
  const startBlanksCount = d === 0 ? 6 : d - 1;
  const endBlanksCount = 7 - ((daysInMonth + startBlanksCount) % 7);

  const filterByDate = (e: ICalEvent) =>
    getMonth(e.date) === monthIndex && getYear(e.date) === year;

  const currentMonthEvents = filter(filterByDate, events);

  return (
    <Fragment key={uuidv4()}>
      <Flex p={2}>
        <Text
          color="gray"
          sx={{ borderBottom: `1px solid ${colors.lightestgray}` }}
        >
          {toMonthString(now)} {year}
        </Text>
      </Flex>
      <Grid>
        {times(renderBlank, startBlanksCount)}
        {times(renderDay(currentMonthEvents), daysInMonth)}
        {times(renderBlank, endBlanksCount)}
      </Grid>
    </Fragment>
  );
};

const toMonthString = formatWithOptions({ locale: fi }, 'LLLL');

// ramda flip does not work
const monthAdder = (date: Date) => (toAdd: number) => addMonths(toAdd, date);
const toMonthYear = (d: Date) => ({
  year: getYear(d),
  monthIndex: getMonth(d),
});

const createCalendarMonths = (start: IYearMonth, count: number) => {
  const startDate = new Date(start.year, start.monthIndex);
  const adder = monthAdder(startDate);

  const toYearMonths = pipe(
    times(adder),
    map(toMonthYear)
  );

  return toYearMonths(count);
};

const EventCalendar: FunctionComponent<IProps> = (props: IProps) => {
  const { start, monthCount, events, topOffset = 0 } = props;

  const nextMonths = createCalendarMonths(start, monthCount);

  return (
    <div>
      <Header>{map(renderHeader, WEEK_DAYS)}</Header>
      <Box>{map(renderMonth(events), nextMonths)}</Box>
    </div>
  );
};

export default EventCalendar;
