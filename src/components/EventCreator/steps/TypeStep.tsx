import React, { FunctionComponent, useState } from 'react';
import { Button, Flex } from 'rebass';
import map from 'ramda/es/map';
import BaseStep from './BaseStep';
import sortBy from 'ramda/es/sortBy';
import prop from 'ramda/es/prop';
import { IEventType } from '../../../types';
import { RightArrowButton } from '../../Common';

const sortByTitle = sortBy(prop('title'));

interface IProps {
  selectedType?: string;
  types: IEventType[];
  setSelectedType: OnSelectType;
  toNextStep: any;
}

type OnSelectType = (type: string) => void;

const renderTypeButton = (setSelected: OnSelectType, selectedType: any) => (
  type: IEventType
) => {
  const variant = selectedType === type.type ? 'primary' : 'secondary';

  return (
    <Button
      key={type.type}
      width={150}
      onClick={() => setSelected(type.type)}
      variant={variant}
      m={1}
    >
      {type.title}
    </Button>
  );
};

const TypeStep: FunctionComponent<IProps> = (props: IProps) => {
  const { selectedType, types, setSelectedType, toNextStep } = props;

  const ordered = sortByTitle(types);
  const typeRender = renderTypeButton(setSelectedType, selectedType);
  return (
    <BaseStep title="Valitse tyyppi">
      <Flex flexWrap="wrap" justifyContent="center">
        {map(typeRender, ordered)}
      </Flex>
      <Flex my={4} width="100%" alignItems="center" justifyContent="flex-end">
        <RightArrowButton onClick={toNextStep} visible={!!selectedType} />
      </Flex>
    </BaseStep>
  );
};

export default TypeStep;
