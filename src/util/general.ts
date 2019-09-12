import { isNull, isUndefined } from 'ramda-adjunct';

export const isNullOrUndefined = (a: any) => isNull(a) || isUndefined(a);
