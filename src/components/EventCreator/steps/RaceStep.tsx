import React, { FunctionComponent, useState } from 'react';
import Switch from 'react-switch';
import { Flex } from 'rebass';
import BaseStep from './BaseStep';

interface IProps {
  preSelectedRace?: boolean;
}

const RaceStep: FunctionComponent<IProps> = (props: IProps) => {
  const { preSelectedRace = false} = props;

  const [isRace, setIsRace] = useState(preSelectedRace);

  return (
    <BaseStep title="Onko kilpailu?">
      <Flex justifyContent="center">
        <Switch
          onChange={val => {
            setIsRace(val);
          }}
          checked={isRace}
        />
      </Flex>
    </BaseStep>
  );
};

export default RaceStep;
