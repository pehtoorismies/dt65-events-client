import React, { FunctionComponent, Fragment } from 'react';
import { Flex, Box, Button } from 'rebass';
import styled from '@emotion/styled';

import { ListUl } from 'styled-icons/boxicons-regular/ListUl';
import { Calendar } from 'styled-icons/boxicons-regular/Calendar';
import { VIEW } from '../../types';

interface IColor {
  color: string;
}

const Cal = styled(Calendar)<IColor>`
  color: ${(props: IColor) => props.color};
  height: 20px;
`;
const List = styled(ListUl)<IColor>`
  color: ${(props: IColor) => props.color};
  height: 20px;
`;

interface IProps {
  onChooseType: (type: VIEW) => void;
  selectedView: VIEW;
}

const ViewChooser: FunctionComponent<IProps> = (props: IProps) => {
  const { onChooseType, selectedView } = props;

  const selectCal = () => onChooseType(VIEW.CALENDAR);
  const selectList = () => onChooseType(VIEW.LIST);

  return (
    <Flex width="100%" bg="white" py={1}>
      <Box width="50%" mr="2px">
        <Button
          p={1}
          variant={selectedView === VIEW.LIST ? 'primary' : 'greyed'}
          onClick={selectList}
          width="100%"
        >
          <List color='white' />
        </Button>
      </Box>
      <Box width="50%">
        <Button
          p={1}
          variant={
            selectedView === VIEW.CALENDAR ? 'primary' : 'greyed'
          }
          onClick={selectCal}
          width="100%"
        >
          <Cal color='white' />
        </Button>
      </Box>
    </Flex>
  );
};

export default ViewChooser;
