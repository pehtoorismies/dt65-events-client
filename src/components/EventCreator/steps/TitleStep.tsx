import React, { FunctionComponent } from 'react';
import BaseStep from './BaseStep';
import { Button, Flex } from 'rebass';

interface IProps {
  title?: string;
  subtitle?: string;
  setTitles: (title: string, subtitle?: string) => void;
}

const TitleStep: FunctionComponent<IProps> = (props: IProps) => {
const { title, subtitle, setTitles } = props;

return (<BaseStep title="Anna tapahtumalle nimi">
<Flex justifyContent="center" alignSelf="center">
  moi
</Flex>
</BaseStep>);
}

export default TitleStep;