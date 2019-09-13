import React, { FunctionComponent, useState } from 'react';
import { Box, Flex, Text } from 'rebass';
import Switch from 'react-switch';
import BaseStep from './BaseStep';
import { RightArrowButton, LeftArrowButton } from '../../Common';
import { IEventStep, ITime } from '../../../types';
import TimeSet from '../../TimeSet';

interface IProps extends IEventStep {
  time?: ITime;
  setTime: (time: ITime) => void;
}

const TimeStep: FunctionComponent<IProps> = (props: IProps) => {
  const { time, setTime, toNextStep, toPrevStep } = props;

  const [useTime, setUseTime] = useState(false);

  return (
    <BaseStep title="Kellonaika">
      <Flex flexDirection="column" alignItems="center">
        <Text p={2}>Tapahtumalla tietty alkamisaika</Text>
        <Box my={2}>
          <Switch
            onChange={(val: boolean) => {
              setUseTime(val);
            }}
            checked={useTime}
          />
        </Box>

        <Flex justifyContent="center" alignSelf="center">
          <TimeSet disabled={!useTime} time={time} setTime={setTime} />
        </Flex>
      </Flex>

      <Flex
        my={4}
        width="100%"
        alignItems="center"
        justifyContent="space-between"
      >
        <LeftArrowButton onClick={toPrevStep} visible={true} />
        <RightArrowButton onClick={toNextStep} visible={true} />
      </Flex>
    </BaseStep>
  );
};

export default TimeStep;
