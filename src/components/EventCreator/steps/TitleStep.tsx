import React, { FunctionComponent } from 'react';

interface IProps {
  prop?: string;
}

const TitleStep: FunctionComponent<IProps> = (props: IProps) => {
const { prop } = props;

return (<div>TitleStep</div>);
}

export default TitleStep;