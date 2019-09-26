import React, { FunctionComponent } from 'react';
import Switch from 'react-switch';
import { Flex, Text } from 'rebass';

import { EVENT_TYPES } from '../../../constants';
import { IEventState, IEventStep } from '../../../types';
import {
  dateToString,
  fromEventType,
  timeToString,
} from '../../../util/general';
import { LeftArrowButton, RightArrowButton } from '../../Common';
import EventCard from '../../EventCard';
import BaseStep from './BaseStep';

interface IProps extends IEventStep {
  username: string;
  eventState: IEventState;
  joinCreator: () => void;
  isEdit: boolean;
}

const StepCreate: FunctionComponent<IProps> = (props: IProps) => {
  const {
    toPrevStep,
    toNextStep,
    username,
    eventState,
    joinCreator,
    isEdit,
  } = props;

  const participants = eventState.creatorJoining ? [{ id: 1, username }] : [];
  if (!eventState.type) {
    throw new Error('Eventtype not defined');
  }
  const type = fromEventType(eventState.type, EVENT_TYPES);
  const orgParticipants = eventState.participants || [];
  const submitText = isEdit ? 'Muokkaa' : 'Luo';

  const previewEvent = {
    ...eventState,
    id: 0,
    time: eventState.timeEnabled ? timeToString(eventState.time) : '',
    participants: isEdit ? orgParticipants : participants,
    type,
    race: eventState.race || false,
    title: eventState.title || 'empty',
    date: dateToString(eventState.date || new Date()),
  };

  const iamJoining = isEdit ? null : (
    <Flex pt={2} alignItems="center" justifyContent="center">
      <Flex alignItems="center" justifyContent="center">
        <Text mr={2}>Osallistun itse?</Text>
        <Switch onChange={joinCreator} checked={eventState.creatorJoining} />
      </Flex>
    </Flex>
  );

  return (
    <BaseStep title="Esikatsele">
      <Flex flexDirection="column" alignItems="center" width="100%">
        <EventCard
          stayOpened={true}
          {...previewEvent}
          username={username}
          creator={username}
        />
        {iamJoining}
      </Flex>
      <Flex
        my={1}
        width="100%"
        alignItems="center"
        justifyContent="space-between"
      >
        <LeftArrowButton onClick={toPrevStep} visible={true} />
        <RightArrowButton
          text={submitText}
          onClick={toNextStep}
          visible={true}
        />
      </Flex>
    </BaseStep>
  );
};

export default StepCreate;
