import { ReactNode } from "react";


export interface IEventType {
  img: string;
  title: string;
  type: string;
};
export interface IFormProps {
  initialValues: any;
  render: (formikBag: any) => any;
  validationSchema: any;
};

export interface IAuthFormProps {
  onSubmit: (value: any, actions: any) => any;
  errorMessage?: string;
  children?: ReactNode,
}

export type IParticipant = {
  username: string;
  id: string;
};

export interface IEventState {
  type?: string;
  race?: boolean;
  title?: string;
  subtitle?: string;
  date?: Date;
  time?: string;
}
