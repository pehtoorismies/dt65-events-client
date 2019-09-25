import format from 'date-fns/format';
import { fi } from 'date-fns/locale';
import parseISO from 'date-fns/parseISO';
import { isNull, isUndefined } from 'ramda-adjunct';
import find from 'ramda/es/find';
import findIndex from 'ramda/es/findIndex';
import match from 'ramda/es/match';
import path from 'ramda/es/path';
import propEq from 'ramda/es/propEq';

import { EVENT_TYPES } from '../constants';
import {
  EventType,
  IEvent,
  IEventResp,
  IEventState,
  IEventType,
  IParticipant,
  ITime,
} from '../types';

export const isNullOrUndefined = (a: any) => isNull(a) || isUndefined(a);

export const isParticipating = (
  username: string,
  participants: IParticipant[]
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

export const stringToTime = (time?: string): ITime => {
  if (!time) {
    return defaultTime;
  }
  const result = match(/(?<hour>[\d]{2}):(?<minute>[\d]{2})/, time);
  const mStr = path(['groups', 'minute'], result);
  const hStr = path(['groups', 'hour'], result);
  if (!mStr || !hStr) {
    return defaultTime;
  }
  const m = parseInt(String(mStr), 10);
  const h = parseInt(String(hStr), 10);

  return { minute: m, hour: h };
};

export const dateToString = (date: Date): string => {
  const fiWeek: number = parseInt(format(date, 'i'), 10);
  return format(date, 'dd.MM.yyyy (EEEEEE)', { locale: fi });
};

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

export const parseEvent = (evt: IEventResp): IEvent => {
  return {
    ...evt,
    creator: evt.creator.username,
    date: dateToString(parseISO(evt.date)),
    type: fromApiType(evt.type, EVENT_TYPES),
  };
};

export const toEventState = (evt: IEventResp): IEventState => {
  
  return {
    date: parseISO(evt.date),
    description: evt.description,
    creatorJoining: false,
    participants: evt.participants,
    race: evt.race,
    subtitle: evt.subtitle,
    time: stringToTime(evt.time),
    timeEnabled: !!evt.time,
    title: evt.title,
    type: EVENT_TYPES[0].id,
  };
};
