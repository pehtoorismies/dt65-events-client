import { FormikActions } from "formik";
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
