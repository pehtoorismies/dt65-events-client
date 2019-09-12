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

const getPrevVisibility = (step: number, eventState: any) => {
  if (step === 0) {
    return 'hidden';
  }
  return 'visible';
};
const getNextVisibility = (step: number, eventState: any) => {
  const selectedType = path(['type', 'selected'], eventState);
  const isRace = path(['race', 'isRace'], eventState);

  if (!isTruthy(selectedType)) {
    return 'hidden';
  }
  if (step === 1 && isNullOrUndefined(isRace)) {
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
      <Flex
        my={4}
        width="100%"
        alignItems="center"
        justifyContent="space-between"
      >
        <Button
          onClick={gotoPrevStep}
          sx={{ visibility: prevVisible }}
          variant="outlinePrimary"
          m={1}
          width={150}
        >
          <Flex alignItems="center" justifyContent="space-between">
            <LArrow />
            <Text>EDELLINEN</Text>
          </Flex>
        </Button>
        <Button
          onClick={gotoNextStep}
          sx={{ visibility: nextVisible }}
          variant="outlinePrimary"
          m={1}
          width={150}
        >
          <Flex alignItems="center" justifyContent="space-between">
            <Text>SEURAAVA</Text>
            <RArrow />
          </Flex>
        </Button>
      </Flex>
    </Box>
  );
};

export default withTheme(EventCreator);
