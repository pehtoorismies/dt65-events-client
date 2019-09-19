import React, { FunctionComponent } from 'react';
import { Flex, Text } from 'rebass';
import BaseStep from './BaseStep';
import Switch from 'react-switch';
import { RightArrowButton, LeftArrowButton } from '../../Common';
import { IEventStep, IEventState } from '../../../types';
import EventCard from '../../EventCard';
import { EVENT_TYPES } from '../../../constants';
import { timeToString, fromEventType } from '../../../util/general';

interface IProps extends IEventStep {
  username: string;
  eventState: IEventState;
  joinCreator: () => void;
}

const StepCreate: FunctionComponent<IProps> = (props: IProps) => {
  const { toPrevStep, toNextStep, username, eventState, joinCreator } = props;

  const participants = eventState.creatorJoining ? [{ id: 1, username }] : [];
  if (!eventState.type) {
    throw new Error('Eventtype not defined');
  }
  const type = fromEventType(eventState.type, EVENT_TYPES);

  const previewEvent = {
    ...eventState,
    time: eventState.timeEnabled ? timeToString(eventState.time) : '',
    participants: [],
    type,
    race: eventState.race || false,
    title: eventState.title || 'empty',
    date: eventState.date || new Date(),
  };

  return (
    <BaseStep title="Esikatsele">
      <Flex flexDirection="column" alignItems="center" width="100%">
        <EventCard
          stayOpened={true}
          {...previewEvent}
          participants={participants}
          username={username}
        />
        <Flex pt={2} alignItems="center" justifyContent="center">
          <Flex alignItems="center" justifyContent="center">
            <Text mr={2}>Osallistun itse?</Text>
            <Switch
              onChange={joinCreator}
              checked={eventState.creatorJoining}
            />
          </Flex>
        </Flex>
      </Flex>
      <Flex
        my={1}
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
