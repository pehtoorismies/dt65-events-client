import React, { FunctionComponent, useState } from 'react';
import { Box, Flex, Text } from 'rebass';
import { withTheme } from 'emotion-theming';
import pick from 'ramda/es/pick';
import mergeRight from 'ramda/es/mergeRight';
import StepCounter from '../StepCounter';
import { IEventState, IEventReq } from '../../types';
import getStep from './stepGetter';
import { timeToString, toApiType } from '../../util/general';
import { EVENT_TYPES } from '../../constants';

interface IProps {
  createEvent: (evt: IEventReq) => void;
  username: string;
  errorMessage?: string;
}

const MAX_STEP = 7;

const EventCreator: FunctionComponent<IProps> = (props: IProps) => {
  const { createEvent, username } = props;
  const [step, setStep] = useState<number>(0);
  const [eventState, setEventState] = useState<IEventState>({
    time: { hour: 0, minute: 0 },
    timeEnabled: false,
    creatorJoining: true,
  });

  const create = (): void => {
    if (
      !eventState.date ||
      !eventState.type ||
      !eventState.race ||
      !eventState.title
    ) {
      console.error(eventState);
      throw new Error('Unpossible state'); // TODO: fix
    }
    const date = eventState.date;
    const time = eventState.timeEnabled
      ? timeToString(eventState.time)
      : undefined;
    const description = eventState.description;
    const race = eventState.race;
    const title = eventState.title;
    const subtitle = eventState.subtitle;
    const creatorJoining = eventState.creatorJoining;

    const type: string = toApiType(eventState.type, EVENT_TYPES);

    const mandatory = {
      date,
      type,
      title,
      race,
      creatorJoining,
    };
    const optional = {
      time,
      description,
      subtitle,
    };

    const evt: IEventReq = mergeRight(mandatory, optional);

    createEvent(evt);
  };

  return (
    <Box>
      <Text pt={2} textAlign="center">
        Tapahtuman luonti
      </Text>
      <Flex p={1} justifyContent="center">
        <StepCounter completed={step} total={MAX_STEP} />
      </Flex>
      <Flex>
        {getStep(step, setStep, eventState, setEventState, create, username)}
      </Flex>
    </Box>
  );
};

export default withTheme(EventCreator);
