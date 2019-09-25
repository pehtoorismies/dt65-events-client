import format from 'date-fns/format';
import { fi } from 'date-fns/locale';
import parseISO from 'date-fns/parseISO';
import { isNull, isUndefined } from 'ramda-adjunct';
import find from 'ramda/es/find';
import findIndex from 'ramda/es/findIndex';
import propEq from 'ramda/es/propEq';

import { EVENT_TYPES } from '../constants';
import {
  EventType,
  IEvent,
  IEventResp,
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
