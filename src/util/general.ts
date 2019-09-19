import { isNull, isUndefined } from 'ramda-adjunct';
import { IParticipant, ITime, EventType, IEventType } from '../types';
import propEq from 'ramda/es/propEq';
import findIndex from 'ramda/es/findIndex';

import find from 'ramda/es/find';

export const isNullOrUndefined = (a: any) => isNull(a) || isUndefined(a);

export const isParticipating = (
  username: string,
  participants: IParticipant[]
) => {
  return findIndex(propEq('username', username || ''))(participants || []) >= 0;
};

export const timeToString = (time: ITime): string => {
  return 'joku time';
};

export const toApiType = (evtType: EventType, events: IEventType[]): string => {
  const eType: IEventType = find(propEq('id', evtType))(events);
  return eType.title;
};

export const fromEventType = (
  e: EventType,
  events: IEventType[]
): IEventType => {
  return find(propEq('id', e))(events);
};
