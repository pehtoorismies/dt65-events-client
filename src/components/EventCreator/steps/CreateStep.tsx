import React, { FunctionComponent, useState } from 'react';
import { Flex, Text } from 'rebass';
import BaseStep from './BaseStep';
import Switch from 'react-switch';
import { RightArrowButton, LeftArrowButton } from '../../Common';
import { IEventStep, IEventState } from '../../../types';
import EventCard from '../../EventCard';
import path from 'ramda/es/path';
import find from 'ramda/es/find';
import propEq from 'ramda/es/propEq';
import { EVENT_TYPES } from '../../../constants';

interface IProps extends IEventStep {
  prop?: string;
  username: string;
  eventState: IEventState;
}

const getTime = (eventState: IEventState): string => {
  if (!eventState.timeEnabled) {
    return '';
  }
  const hour = path(['time', 'hour'], eventState);
  const minute = path(['time', 'minute'], eventState);

  return `${hour}:${minute}`;
};

const StepCreate: FunctionComponent<IProps> = (props: IProps) => {
  const { toPrevStep, toNextStep, username, eventState } = props;
  const [joining, setJoining] = useState(true);
  const participants = joining ? [{ id: 1, username }] : [];

  const type = find(propEq('type', eventState.type))(EVENT_TYPES);
  const previewEvent = {
    ...eventState,
    time: getTime(eventState),
    participants: [],
    type,
    race: eventState.race || false,
    title: eventState.title || 'empty',
    date: eventState.date || new Date(),
  };

  const joinSetter = (val: boolean) => {
    setJoining(val);
  };

  return (
    <BaseStep title="Esikatsele">
      <Flex py={3} alignItems="center" justifyContent="center">
        <Flex alignItems="center" justifyContent="center">
          <Text mr={2}>Osallistun itse?</Text>
          <Switch onChange={joinSetter} checked={joining} />
        </Flex>
      </Flex>

      <Text textAlign="center">Tarkista, että tiedot ovat oikein</Text>
      <EventCard
        stayOpened={true}
        {...previewEvent}
        participants={participants}
        username={username}
      />
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
