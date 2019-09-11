import React, { FunctionComponent } from 'react';
import { Circle } from 'styled-icons/boxicons-regular/Circle';
import { Dash } from 'styled-icons/octicons/Dash';
import { CheckCircle } from 'styled-icons/boxicons-solid/CheckCircle';
import { Box, Flex, Text } from 'rebass';
import styled from '@emotion/styled';
import { withTheme } from 'emotion-theming';
import times from 'ramda/es/times';
import map from 'ramda/es/map';
import identity from 'ramda/es/identity';
import concat from 'ramda/es/concat';
import intersperse from 'ramda/es/intersperse';

// @ts-ignore - hack
const getPink = theme => theme.colors.pink;

const EmptyCircle = styled(Circle)`
  color: ${props => getPink(props.theme)};
  width: 20px;
`;

const CheckedCircle = styled(CheckCircle)`
  color: ${props => getPink(props.theme)};
  width: 20px;
`;
const Connector = styled(Dash)`
  color: ${props => getPink(props.theme)};
  width: 15px;
`;

interface IProps {
  total: number;
  completed: number;
  theme?: any; //TODO: hack
}

const StepCounter: FunctionComponent<IProps> = (props: IProps) => {
  const { total, completed } = props;
  const uncompleted = total - completed;

  const completedElems = times(
    id => <CheckedCircle key={`c-${id}`} />,
    completed
  );
  const uncompletedElems = times(
    id => <EmptyCircle key={`c-${id}`} />,
    uncompleted
  );
  const all = concat(completedElems, uncompletedElems);
  const withDashes = intersperse(<Connector />, all);
  return (
    <Box>
      {map(identity, withDashes)}
      <Text
        textAlign="center"
        fontSize={10}
        fontFamily={`'Share Tech Mono', monospace`}
      >
        steps
      </Text>
      
    </Box>
  );
};

export default withTheme(StepCounter);
