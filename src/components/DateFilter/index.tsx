import React, { FunctionComponent, Fragment } from 'react';
import { Flex, Text } from 'rebass';
import styled from '@emotion/styled';
import { Filter } from 'styled-icons/boxicons-regular/Filter';
import { CloseCircle } from 'styled-icons/remix-fill/CloseCircle';
import format from 'date-fns/format';
import { colors } from '../../theme';

interface IProps {
  date?: Date;
  onClearDate: () => void;
}

const FilterIcon = styled(Filter)`
  color: ${colors.blue};
  height: 25px;
`;

const CloseIcon = styled(CloseCircle)`
  color: ${colors.white};
  height: 14px;
  margin-left: 5px;
`;

const DateFilter: FunctionComponent<IProps> = (props: IProps) => {
  const { date, onClearDate } = props;

  if (!date) {
    return <div />;
  }

  const dateString = format(date, 'dd.MM.yyyy');

  return (
    <Fragment>
      <Flex flexDirection="column" width="100%" alignItems="flex-start">
      <Flex alignItems="center" justifyContent="flex-start">
        <FilterIcon />
        <Text fontSize={1}>Filtterit</Text>
      </Flex>

      <Flex
        p={1}
        bg="blue"
        sx={{
          borderRadius: '10px',
        }}
        alignItems="center"
      >
        <Text fontSize={1} color="white">
          {dateString}
        </Text>
        <CloseIcon onClick={onClearDate} />
      </Flex>
    </Flex>
    </Fragment>
    
  );
};

export default DateFilter;
