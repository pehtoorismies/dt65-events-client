import React, { FunctionComponent, Fragment } from 'react';

interface IProps {
  someProp?: string;
}

const DateFilter: FunctionComponent<IProps> = (props: IProps) => {
  const {
    someProp,
  } = props;

  return (
    <Fragment>
      {someProp}
    </Fragment>
  
  );
};

export default DateFilter;