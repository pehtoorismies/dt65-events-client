import React, { FunctionComponent, useState } from 'react';
import { Box, Button, Flex, Text } from 'rebass';
import styled from '@emotion/styled';
import { withTheme } from 'emotion-theming';
import { css } from '@emotion/core';
import { RightArrow } from 'styled-icons/boxicons-solid/RightArrow';
import { LeftArrow } from 'styled-icons/boxicons-solid/LeftArrow';
import StepCounter from '../StepCounter';
import StepType from './steps/TypeStep';
import { EVENT_TYPES } from '../../constants';
import assocPath from 'ramda/es/assocPath';
import path from 'ramda/es/path';
import { isTruthy } from 'ramda-adjunct';

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

const getStep = (step: number, eventState: any, setEventState: any) => {
  const setType = (eventType: string) => {
    setEventState(assocPath(['type', 'selected'], eventType, eventState));
  };

  return (
    <StepType
      setSelectedType={setType}
      preSelectedType={eventState.type.selected}
      types={EVENT_TYPES}
    />
  );
};

const INIT_STATE = {
  type: {
    selected: '',
  },
};

const getPrevVisibility = (step: number, eventState: any) => {
  if (step === 0) {
    return 'hidden';
  }
  return 'visible';
};
const getNextVisibility = (step: number, eventState: any) => {
  const selected = path(['type', 'selected'], eventState);
  console.log('s', selected);
  if (!isTruthy(selected)) {
    
    return 'hidden';
  }
  return 'visible';
};

const EventCreator: FunctionComponent<IProps> = (props: IProps) => {
  const { prop } = props;
  const [step, setStep] = useState(0);
  const [eventState, setEventState] = useState(INIT_STATE);

  const prevVisible = getPrevVisibility(step, eventState);
  const nextVisible = getNextVisibility(step, eventState);

  return (
    <Box>
      <Text pt={2} textAlign="center">
        Tapahtuman luonti
      </Text>
      <Flex p={1} justifyContent="center">
        <StepCounter completed={step} total={6} />
      </Flex>
      <Flex>{getStep(step, eventState, setEventState)}</Flex>
      <Flex
        my={4}
        width="100%"
        alignItems="center"
        justifyContent="space-between"
      >
        <Button
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
