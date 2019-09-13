import React, { FunctionComponent, useState } from 'react';
import { Button, Flex, Text } from 'rebass';
import Switch from 'react-switch';
import BaseStep from './BaseStep';
import { RightArrowButton, LeftArrowButton } from '../../Common';
import { IEventStep } from '../../../types';

interface IProps extends IEventStep {
  time?: string;
  setTime: (time: string) => void;
}

const TimeStep: FunctionComponent<IProps> = (props: IProps) => {
  const { time, setTime, toNextStep, toPrevStep } = props;

  const [useTime, setUseTime] = useState(false);

  return (
    <BaseStep title="Kellonaika">
      <Flex flexDirection="column" alignItems="center">
        <Text p={2}>Tapahtumalla tietty alkamisaika</Text>
        <Switch
          onChange={(val: boolean) => {
            setUseTime(val);
          }}
          checked={useTime}
        />
        <Flex justifyContent="center" alignSelf="center">
          <Button width={150} m={1}>
            EI
          </Button>
          <Button width={150} m={1}>
            KYLLÄ
          </Button>
        </Flex>
      </Flex>

      <Flex
        my={4}
        width="100%"
        alignItems="center"
        justifyContent="space-between"
      >
        <LeftArrowButton onClick={toPrevStep} visible={true} />
        <RightArrowButton onClick={toNextStep} />
      </Flex>
    </BaseStep>
  );
};

export default TimeStep;
