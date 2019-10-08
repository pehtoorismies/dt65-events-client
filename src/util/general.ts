import format from 'date-fns/format';
import { setHours, setMinutes } from 'date-fns/fp';
import getHours from 'date-fns/getHours';
import getMinutes from 'date-fns/getMinutes';
import { fi } from 'date-fns/locale';
import parseISO from 'date-fns/parseISO';
import qs from 'qs';
import { isNull, isUndefined } from 'ramda-adjunct';
import compose from 'ramda/es/compose';
import find from 'ramda/es/find';
import findIndex from 'ramda/es/findIndex';
import prop from 'ramda/es/prop';
import propEq from 'ramda/es/propEq';
import replace from 'ramda/es/replace';

import { EVENT_TYPES, QUERY_PARAMS, ROUTES } from '../constants';
import {
  EventType,
  IEvent,
  IEventResp,
  IEventState,
  IEventType,
  ISimpleUser,
  ITime,
  ICalEvent,
} from '../types';

export const isNullOrUndefined = (a: any) => isNull(a) || isUndefined(a);

export const isParticipating = (
  username: string,
  participants: ISimpleUser[]
) => {
  return findIndex(propEq('username', username || ''))(participants || []) >= 0;
};

const zeroPad = (n: number) => {
  const fill = n < 10 ? '0' : '';
  return `${fill}${n}`;
};

export const timeToString = (time: ITime): string => {
  const m: string = zeroPad(time.minute);
  const h: string = zeroPad(time.hour);
  return `${h}:${m}`;
};

const defaultTime = { minute: 0, hour: 0 };

const dateToTime = (date: Date, exactTime: boolean): ITime => {
  if (!exactTime) {
    return defaultTime;
  }

  return { minute: getMinutes(date), hour: getHours(date) };
};

export const dateToString = (date: Date): string =>
  format(date, 'dd.MM.yyyy (EEEEEE)', { locale: fi });

export const toApiType = (evtType: EventType, events: IEventType[]): string => {
  const eType: IEventType = find(propEq('id', evtType))(events);
  return eType.apiType;
};

export const fromEventType = (
  e: EventType,
  events: IEventType[]
): IEventType => {
  return find(propEq('id', e))(events);
};

export const fromApiType = (
  apiType: string,
  events: IEventType[]
): IEventType => {
  return find(propEq('apiType', apiType))(events);
};

export const toDate = (date: string, time?: ITime): Date => {
  const d = parseISO(date);
  if (!time) {
    return d;
  }
  const { minute, hour } = time;
  const updated = compose(
    setHours(hour),
    setMinutes(minute)
  )(d);
  return updated;
};

export const toISODate = (date: Date, time?: ITime): string => {
  if (!time) {
    return date.toISOString();
  }

  const { minute, hour } = time;
  const updated: Date = compose(
    setHours(hour),
    setMinutes(minute)
  )(date);

  return updated.toISOString();
};

export const parseEvent = (evt: IEventResp): IEvent => {
  const date = parseISO(evt.date);
  const time = evt.exactTime ? format(date, 'HH:mm') : '';

  return {
    ...evt,
    time,
    creator: evt.creator.username,
    date: dateToString(date),
    type: fromApiType(evt.type, EVENT_TYPES),
  };
};

export const formatICalEvent = (evt: IEventResp): ICalEvent => {
  const date = parseISO(evt.date);
 
  return {
    date,
    type: fromApiType(evt.type, EVENT_TYPES).id,
  };
};



export const toEventState = (evt: IEventResp): IEventState => {
  const date = parseISO(evt.date);
  return {
    date,
    description: evt.description,
    creatorJoining: false,
    participants: evt.participants,
    race: evt.race,
    subtitle: evt.subtitle,
    time: dateToTime(date, evt.exactTime),
    timeEnabled: !!evt.exactTime,
    title: evt.title,
    type: fromApiType(evt.type, EVENT_TYPES).id,
  };
};

export const queryParamsFrom = (fromValue: string): string =>
  `${QUERY_PARAMS.KEYS.FROM}=${fromValue}`;

export const fromUrlFromQueryString = (
  queryString: string,
  eventId?: string
): string => {
  const params = qs.parse(queryString, { ignoreQueryPrefix: true });
  const val = prop(QUERY_PARAMS.KEYS.FROM, params);

  if (val === QUERY_PARAMS.VALUES.FROM.HOME) {
    return ROUTES.home;
  }
  if (val === QUERY_PARAMS.VALUES.FROM.VIEW) {
    return replace(/:id/g, String(eventId), ROUTES.viewEvent);
  }
  return ROUTES.home;
};
