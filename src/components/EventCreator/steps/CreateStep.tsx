import React, { FunctionComponent, useState } from 'react';
import { Box, Button, Flex, Text } from 'rebass';
import BaseStep from './BaseStep';
import Switch from 'react-switch';
import { RightArrowButton, LeftArrowButton } from '../../Common';
import { IEventStep } from '../../../types';
import EventCard from '../../EventCard';

interface IProps extends IEventStep {
  prop?: string;
  username: string;
}

const StepCreate: FunctionComponent<IProps> = (props: IProps) => {
  const { toPrevStep, toNextStep, username } = props;
  const [joining, setJoining] = useState(true);
  const participants = joining ? [{id: 1, username}] : [];

  return (
    <BaseStep title="Esikatsele">
      <Flex py={3} alignItems="center" justifyContent="center">
        <Flex alignItems="center" justifyContent="center">
          <Text mr={2}>Osallistun itse?</Text>
          <Switch
            onChange={(val: boolean) => {
              setJoining(val);
            }}
            checked={joining}
          />
        </Flex>
      </Flex>

      <Text textAlign="center">Tarkista, että tiedot ovat oikein</Text>
      <EventCard username={username} participants={participants} />
      <Flex
        my={4}
        width="100%"
        alignItems="center"
        justifyContent="space-between"
      >
        <LeftArrowButton onClick={toPrevStep} visible={true} />
        <RightArrowButton text="Luo" onClick={toNextStep} visible={true} />
      </Flex>
    </BaseStep>
  );
};

export default StepCreate;
