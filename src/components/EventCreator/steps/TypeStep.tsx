import React, { FunctionComponent, useState } from 'react';
import { Box, Button, Flex, Text } from 'rebass';
import { IEventType } from '../../../types';
import map from 'ramda/es/map';
import BaseStep from './BaseStep';

interface IProps {
  preSelectedType?: string;
  types: IEventType[];
}

type OnSelectType = (type: string) => void;

const renderTypeButton = (setSelected: OnSelectType, selectedType: any) => (
  type: IEventType
) => {
  const variant = selectedType === type.type ? 'primary' : 'secondary';

  return (
    <Button onClick={() => setSelected(type.type)} variant={variant} m={1}>
      {type.title}
    </Button>
  );
};

const TypeStep: FunctionComponent<IProps> = (props: IProps) => {
  const { preSelectedType, types } = props;
  const [selectedType, setSelected] = useState(preSelectedType);

  const typeRender = renderTypeButton(setSelected, selectedType);
  return (
    <BaseStep title="Valitse tapahtuman tyyppi">
      <Flex flexWrap="wrap" justifyContent="center">
        {map(typeRender, types)}
      </Flex>
    </BaseStep>
  );
};

export default TypeStep;
