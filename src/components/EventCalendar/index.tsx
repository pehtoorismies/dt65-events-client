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
import head from 'ramda/es/head';
import React, { Fragment, FunctionComponent } from 'react';
import { Box, Flex, Text, Image } from 'rebass';
import uuidv4 from 'uuid/v4';

import { WEEK_DAYS } from '../../constants';
import { colors } from '../../theme';
import { IYearMonth, ICalEvent, EventType } from '../../types';

import logo_running from '../../images/calendar-logos/running.png';
import logo_swimming from '../../images/calendar-logos/swimming.png';
import logo_orienteering from '../../images/calendar-logos/orienteering.png';
import logo_cycling from '../../images/calendar-logos/cycling.png';
import logo_party from '../../images/calendar-logos/party.png';
import logo_other from '../../images/calendar-logos/other.png';
import logo_skiing from '../../images/calendar-logos/skiing.png';
import logo_triathlon from '../../images/calendar-logos/triathlon.png';
import logo_kickoff from '../../images/calendar-logos/kickoff.png';
// import logo_trailrunning from '../../images/calendar-logos/running.png';
// import logo_nordicwalking from '../../images/calendar-logos/running.png';
import { format } from 'date-fns';

type DaySelect = (date: string) => void; 

interface IProps {
  start: IYearMonth;
  monthCount: number;
  events: ICalEvent[];
  onSelectDay: DaySelect;
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
  [EventType.Cycling]: logo_cycling,
  [EventType.Karonkka]: logo_party,
  [EventType.Meeting]: logo_kickoff,
  [EventType.NordicWalking]: logo_running,
  [EventType.Orienteering]: logo_orienteering,
  [EventType.Other]: logo_other,
  [EventType.Running]: logo_running,
  [EventType.Skiing]: logo_skiing,
  [EventType.Spinning]: logo_cycling,
  [EventType.Swimming]: logo_swimming,
  [EventType.TrackRunning]: logo_running,
  [EventType.TrailRunning]: logo_running,
  [EventType.Triathlon]: logo_triathlon,
  [EventType.Ultras]: logo_kickoff,
};

const renderEventIcon = (evt: ICalEvent) => {
  return (
    <Image
      key={uuidv4()}
      m={1}
      src={icons[evt.type]}
      sx={{
        width: '16px',
        height: '16px',
      }}
    />
  );
};

const renderDay = (monthEvents: ICalEvent[], onSelectDay: DaySelect) => (index: number) => {
  const filterByDay = (e: ICalEvent) => {
    return index + 1 === getDate(e.date);
  };

  const currentDayEvents = filter(filterByDay, monthEvents);
  const hasEvents = currentDayEvents.length > 0;

  const onSelect = () => {
    const evt: ICalEvent | undefined = head(currentDayEvents);
    if (evt) {
      const f = format(evt.date, 'yyyy-MM-dd');
      onSelectDay(f);
    }
  };

  return (
    <Flex
      p={1}
      flexDirection="column"
      key={uuidv4()}
      alignItems="center"
      justifyContent="flex-start"
      bg={hasEvents ? 'lightPink' : 'white'}
      sx={{ borderBottom: `1px solid ${colors.lightergray}` }}
      onClick={onSelect}
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

const renderMonth = (events: ICalEvent[], onSelectDay: DaySelect) => (yearMonth: IYearMonth) => {
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
        {times(renderDay(currentMonthEvents, onSelectDay), daysInMonth)}
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
  const { start, monthCount, events, onSelectDay } = props;

  const nextMonths = createCalendarMonths(start, monthCount);

  return (
    <div>
      <Header>{map(renderHeader, WEEK_DAYS)}</Header>
      <Box>{map(renderMonth(events, onSelectDay), nextMonths)}</Box>
    </div>
  );
};

export default EventCalendar;
