import { isNull, isUndefined } from 'ramda-adjunct';
import { IParticipant } from '../types';
import propEq from 'ramda/es/propEq';
import findIndex from 'ramda/es/findIndex';

export const isNullOrUndefined = (a: any) => isNull(a) || isUndefined(a);

export const isParticipating = (username: string, participants: IParticipant[]) => {
  return findIndex(propEq('username', username || ''))(participants || []) >= 0;
};
