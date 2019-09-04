export interface IEventType {
  img: string;
  title: string;
  type: string;
};
export interface IFormProps {
  initialValues: any;
  onSubmit: (value: any, actions: any) => any;
  render: (formikBag: any) => any;
  validationSchema: any;
};

export interface IAuthFormProps {
  onSubmit: (value: any, actions: any) => any;
  errorMessage?: string;
  onNavigateClick: () => any;
}