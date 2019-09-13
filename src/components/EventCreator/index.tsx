import React, { FunctionComponent, useState } from 'react';
import { Box, Button, Flex, Text } from 'rebass';
import { withTheme } from 'emotion-theming';
import StepCounter from '../StepCounter';
import { IEventState } from '../../types';
import getStep from './stepGetter';

interface IProps {
  prop?: string;
}

const MAX_STEP = 7;

const EventCreator: FunctionComponent<IProps> = (props: IProps) => {
  const { prop } = props;
  const [step, setStep] = useState<number>(0);
  const [eventState, setEventState] = useState<IEventState>({
    timeEnabled: false,
  });

  return (
    <Box>
      <Text pt={2} textAlign="center">
        Tapahtuman luonti
      </Text>
      <Flex p={1} justifyContent="center">
        <StepCounter completed={step} total={MAX_STEP} />
      </Flex>
      <Flex>{getStep(step, setStep, eventState, setEventState)}</Flex>
    </Box>
  );
};

export default withTheme(EventCreator);
