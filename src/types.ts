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

// tslint:disable-next-line: interface-over-type-literal
export type ID = number | string;

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

export interface IParticipant {
  username: string;
  id: string | number;
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
  participants?: IParticipant[];
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
  time?: string;
  title: string;
}

export interface IEventReq extends IEventBase {
  date: string;
  type: string;
  creatorJoining: boolean;
}

export interface IEventResp extends IEventBase {
  id: ID,
  date: string;
  type: string;
  participants: IParticipant[];
  creator: IParticipant;
}

export interface IEvent extends IEventBase {
  id: ID;
  date: string;
  participants: IParticipant[];
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
