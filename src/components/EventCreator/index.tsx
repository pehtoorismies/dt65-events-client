import React, { FunctionComponent } from 'react';

interface IProps {
  prop?: string;
}

const EventCreator: FunctionComponent<IProps> = (props: IProps) => {
const { prop } = props;

return (<div>EventCreator</div>);
}

export default EventCreator;