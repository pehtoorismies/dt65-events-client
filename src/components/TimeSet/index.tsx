import React, { FunctionComponent, useState } from 'react';
import { Box, Button, Flex, Text } from 'rebass';
import { UpArrow } from 'styled-icons/boxicons-solid/UpArrow';
import { DownArrow } from 'styled-icons/boxicons-solid/DownArrow';
import styled from '@emotion/styled';
import assoc from 'ramda/es/assoc';
import add from 'ramda/es/add';
import subtract from 'ramda/es/subtract';

interface IProps {
  hour?: number;
  minute?: number;
  setTime: (minute: number, hour: number) => void;
}
interface ITime {
  hour: number;
  minute: number;
}

const BOX_WIDTH = 70;

const Up = styled(UpArrow)`
  color: white;
  width: 30px;
`;
const Down = styled(DownArrow)`
  color: white;
  width: 30px;
`;

const UpButton = (props: any) => (
  <Button {...props} variant="secondary" m={1} width={BOX_WIDTH}>
    <Flex alignItems="center" justifyContent="center">
      <Up />
    </Flex>
  </Button>
);

const DownButton = (props: any) => (
  <Button {...props} variant="secondary" m={1} width={BOX_WIDTH}>
    <Flex alignItems="center" justifyContent="center">
      <Down />
    </Flex>
  </Button>
);

const Center = (props: any) => (
  <Flex {...props} justifyContent="center" alignItems="center" />
);

const NumberDisplay = (props: any) => (
  <Text
    fontSize={50}
    fontWeight="bold"
    fontFamily="monospace"
    width={BOX_WIDTH * 2}
    textAlign="center"
    {...props}
    m={1}
  />
);

const zeroPad = (time: number): string => (time < 10 ? `0${time}` : `${time}`);

const TimeSet: FunctionComponent<IProps> = (props: IProps) => {
  const { hour, minute, setTime } = props;
  const [internalTime, setInternalTime] = useState<ITime>({
    hour: 0,
    minute: 0,
  });

  const adjustMinute = (isAdd: boolean) => {
    const f = isAdd ? add : subtract;
    const newTime = f(internalTime.minute, 5);

    if (isAdd && newTime >= 60) {
      setInternalTime(assoc('minute', 0, internalTime));
    } else if (!isAdd && newTime <= 0) {
      setInternalTime(assoc('minute', 55, internalTime));
    } else {
      setInternalTime(assoc('minute', newTime, internalTime));
    }
  };

  const adjustHour = (isAdd: boolean) => {
    const f = isAdd ? add : subtract;
    const newTime = f(internalTime.hour, 1);

    if (isAdd && newTime >= 24) {
      setInternalTime(assoc('hour', 0, internalTime));
    } else if (!isAdd && newTime <= 0) {
      setInternalTime(assoc('hour', 23, internalTime));
    } else {
      setInternalTime(assoc('hour', newTime, internalTime));
    }
  };

  return (
    <Box>
      <Center>
        <UpButton onClick={() => adjustHour(true)} />
        <UpButton onClick={() => adjustMinute(true)} />
      </Center>
      <Center justifyContent="center" alignItems="center">
        <NumberDisplay>{`${zeroPad(internalTime.hour)}:${zeroPad(
          internalTime.minute
        )}`}</NumberDisplay>
      </Center>
      <Center>
        <DownButton onClick={() => adjustHour(false)} />
        <DownButton onClick={() => adjustMinute(false)} />
      </Center>
    </Box>
  );
};

export default TimeSet;
