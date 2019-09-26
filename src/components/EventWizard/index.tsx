import { withTheme } from 'emotion-theming';
import mergeRight from 'ramda/es/mergeRight';
import React, { FunctionComponent, useState } from 'react';
import { Box, Flex, Text } from 'rebass';

import { EVENT_TYPES } from '../../constants';
import { IEventReq, IEventState } from '../../types';
import { timeToString, toApiType } from '../../util/general';
import StepCounter from '../StepCounter';
import getStep from './stepGetter';

interface IProps {
  applyEvent: (evt: IEventReq) => void;
  username: string;
  errorMessage?: string;
  editState?: IEventState;
}

const MAX_STEP = 7;

const EventWizard: FunctionComponent<IProps> = (props: IProps) => {
  const { applyEvent, username, editState } = props;
  
  const [step, setStep] = useState<number>(0);
  const isEdit = !!editState;

  const initState = editState || {
    time: { hour: 12, minute: 0 },
    timeEnabled: false,
    creatorJoining: true,
  };

  const [eventState, setEventState] = useState<IEventState>(initState);

  const create = (): void => {
    if (!eventState.date || !eventState.type || !eventState.title) {
      console.error(eventState);
      throw new Error('Unpossible state'); // TODO: fix
    }
    const date = eventState.date.toISOString();
    const time = eventState.timeEnabled
      ? timeToString(eventState.time)
      : undefined;

    const creatorJoining = eventState.creatorJoining;
    const description = eventState.description;
    const race = eventState.race || false;
    const subtitle = eventState.subtitle;
    const title = eventState.title;
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

    applyEvent(evt);
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
        {getStep(
          step,
          setStep,
          eventState,
          setEventState,
          create,
          username,
          isEdit
        )}
      </Flex>
    </Box>
  );
};

export default withTheme(EventWizard);
