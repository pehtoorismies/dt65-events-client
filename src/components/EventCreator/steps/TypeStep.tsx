import React, { FunctionComponent, useState } from 'react';
import { Button, Flex, Text } from 'rebass';
import { IEventType } from '../../../types';
import map from 'ramda/es/map';
import BaseStep from './BaseStep';
import sortBy from 'ramda/es/sortBy';
import prop from 'ramda/es/prop';

const sortByTitle= sortBy(prop('title'));

interface IProps {
  selectedType?: string;
  types: IEventType[];
  setSelectedType: OnSelectType;
}

type OnSelectType = (type: string) => void;

const renderTypeButton = (setSelected: OnSelectType, selectedType: any) => (
  type: IEventType
) => {
  const variant = selectedType === type.type ? 'primary' : 'secondary';

  return (
    <Button width={150} onClick={() => setSelected(type.type)} variant={variant} m={1}>
      {type.title}
    </Button>
  );
};

const TypeStep: FunctionComponent<IProps> = (props: IProps) => {
  const { selectedType, types, setSelectedType } = props;
  
  const ordered = sortByTitle(types);
  const typeRender = renderTypeButton(setSelectedType, selectedType);
  return (
    <BaseStep title="Valitse tyyppi">
      <Flex flexWrap="wrap" justifyContent="center">
        {map(typeRender, ordered)}
      </Flex>
    </BaseStep>
  );
};

export default TypeStep;
