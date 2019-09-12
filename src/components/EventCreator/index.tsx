import React, { FunctionComponent, useState } from 'react';
import { Box, Button, Flex, Text } from 'rebass';
import styled from '@emotion/styled';
import { withTheme } from 'emotion-theming';
import { css } from '@emotion/core';
import { RightArrow } from 'styled-icons/boxicons-solid/RightArrow';
import { LeftArrow } from 'styled-icons/boxicons-solid/LeftArrow';
import StepCounter from '../StepCounter';
import { IEventState } from '../../types';
import getStep from './stepGetter';
import path from 'ramda/es/path';
import { isTruthy } from 'ramda-adjunct';
import { isNullOrUndefined } from '../../util/general';

// @ts-ignore
const getPink = theme => theme.colors.pink;

const common = css`
  height: 15px;
  width: 15px;
`;

const RArrow = styled(RightArrow)`
  ${common};
`;
const LArrow = styled(LeftArrow)`
  ${common}
`;

interface IProps {
  prop?: string;
}

const MAX_STEP = 6;

const getPrevVisibility = (step: number, eventState: IEventState) => {
  if (step === 0) {
    return 'hidden';
  }
  return 'visible';
};
const getNextVisibility = (step: number, eventState: IEventState) => {
  if (!isTruthy(eventState.type)) {
    return 'hidden';
  }
  if (step === 1 && isNullOrUndefined(eventState.race)) {
    return 'hidden';
  }
  if (step === 2 && isNullOrUndefined(eventState.title)) {
    return 'hidden';
  }

  return 'visible';
};

const EventCreator: FunctionComponent<IProps> = (props: IProps) => {
  const { prop } = props;
  const [step, setStep] = useState<number>(0);
  const [eventState, setEventState] = useState<IEventState>({});

  const prevVisible = getPrevVisibility(step, eventState);
  const nextVisible = getNextVisibility(step, eventState);

  const gotoNextStep = () => {
    setStep(step + 1);
  };
  const gotoPrevStep = () => {
    setStep(step - 1);
  };

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
