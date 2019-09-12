import React, { FunctionComponent, useState } from 'react';
import { Button, Flex } from 'rebass';
import BaseStep from './BaseStep';
import { isNullOrUndefined } from '../../../util/general';

interface IProps {
  isRace?: boolean;
  setRace(v: boolean): void;
}

const getVariant = (isYes: boolean) => (isRace?: boolean) => {
  if (isNullOrUndefined(isRace)) {
    return 'secondary';
  }

  if (isYes) {
    return isRace ? 'primary' : 'secondary';
  }
  return isRace ? 'secondary' : 'primary';
};

const getYesVariant = (isRace?: boolean) => {
  const chooser = getVariant(true);
  return chooser(isRace);
};
const getNoVariant = (isRace?: boolean) => {
  const chooser = getVariant(false);
  return chooser(isRace);
};

const RaceStep: FunctionComponent<IProps> = (props: IProps) => {
  const { isRace, setRace } = props;

  return (
    <BaseStep title="Kilpailu?">
      <Flex justifyContent="center" alignSelf="center">
        <Button
          width={150}
          onClick={() => setRace(false)}
          variant={getNoVariant(isRace)}
          m={1}
        >
          EI
        </Button>
        <Button
          width={150}
          onClick={() => setRace(true)}
          variant={getYesVariant(isRace)}
          m={1}
        >
          KYLLÄ
        </Button>
      </Flex>
    </BaseStep>
  );
};

export default RaceStep;
