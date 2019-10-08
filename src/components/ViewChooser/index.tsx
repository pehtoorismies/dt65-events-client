import React, { FunctionComponent, Fragment } from 'react';
import { Flex, Box, Button } from 'rebass';
import styled from '@emotion/styled';

import { ListUl } from 'styled-icons/boxicons-regular/ListUl';
import { Calendar } from 'styled-icons/boxicons-regular/Calendar';
import { VIEW } from '../../types';

const Cal = styled(Calendar)`
  color: white;
  height: 20px;
`;
const List = styled(ListUl)`
  color: white;
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
      <Box width="50%">
        <Button
          p={1}
          variant={selectedView === VIEW.LIST ? 'primary' : 'secondary'}
          onClick={selectList}
          width="100%"
        >
          <List />
        </Button>
      </Box>
      <Box width="50%">
        <Button
          p={1}
          variant={selectedView === VIEW.CALENDAR ? 'primary' : 'secondary'}
          onClick={selectCal}
          width="100%"
        >
          <Cal />
        </Button>
      </Box>
    </Flex>
  );
};

export default ViewChooser;
