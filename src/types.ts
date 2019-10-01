import { ReactNode } from 'react';

export enum EventType {
  Cycling = 1,
  Karonkka,
  Meeting,
  Orienteering,
  Other,
  Running,
  Skiing,
  Spinning,
  Swimming,
  TrackRunning,
  Triathlon,
  Ultras,
}

export enum ErrorType {
  Redirect = 1,
  Network,
  Severe,
}

// tslint:disable-next-line: interface-over-type-literal
export type ID = number | string;

export interface IHandleError {
  type: ErrorType;
  message: string;
}

export interface IAuthResponse {
  valid: boolean;
  errorMessage?: string;
}

export interface IEventType {
  defaultImage: string;
  title: string;
  id: EventType;
  apiType: string;
}
export interface IFormProps {
  initialValues: any;
  render: (formikBag: any) => any;
  validationSchema: any;
}

export interface IAuthFormProps {
  onSubmit: (value: any, actions: any) => any;
  errorMessage?: string;
  children?: ReactNode;
}

export interface ISimpleUser {
  username: string;
  id: string | number;
  __typename?: string;
}

export interface ITime {
  hour: number;
  minute: number;
}
export interface IEventState {
  date?: Date;
  description?: string;
  creatorJoining: boolean;
  race?: boolean;
  subtitle?: string;
  time: ITime;
  timeEnabled: boolean;
  title?: string;
  type?: EventType;
  participants?: ISimpleUser[];
}

export interface IEventStep {
  toPrevStep: any;
  toNextStep: any;
}

export interface IEventBase {
  address?: string;
  description?: string;
  race: boolean;
  subtitle?: string;

  title: string;
}

export interface IEventReq extends IEventBase {
  date: string;
  type: string;
  creatorJoining: boolean;
  exactTime: boolean;
}

export interface IEventResp extends IEventBase {
  id: ID;
  date: string;
  exactTime: boolean;
  type: string;
  participants: ISimpleUser[];
  creator: ISimpleUser;
  updatedAt?: string;
  createdAt?: string;
  __typename?: string;
}

export interface IEvent extends IEventBase {
  id: ID;
  date: string;
  time: string;
  participants: ISimpleUser[];
  type: IEventType;
  creator: string;
}

interface IResponse {
  error?: {
    name: string;
    message: string;
  };
}

export interface ICreateEventResponse extends IResponse {
  event?: IEvent;
}

export interface IPreferences {
  subscribeEventCreationEmail: boolean;
  subscribeWeeklyEmail: boolean;
}
