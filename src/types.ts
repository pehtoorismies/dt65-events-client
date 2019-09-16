import { ReactNode } from 'react';

export enum EventType {
  Cycling = 100,
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

export interface IAuthResponse {
  valid: boolean;
  errorMessage?: string
}

export interface IEventType {
  defaultImage: string;
  title: string;
  type: EventType;
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
  race?: boolean;
  subtitle?: string;
  time: ITime;
  timeEnabled: boolean;
  title?: string;
  type?: EventType;
}

export interface IEventStep {
  toPrevStep: any;
  toNextStep: any;
}

export interface IEvent {
  type: IEventType;
  race: boolean;
  title: string;
  subtitle?: string;
  date: Date;
  time?: string;
  description?: string;
  participants: IParticipant[];
}
