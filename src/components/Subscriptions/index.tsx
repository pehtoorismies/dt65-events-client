import React, { Fragment, FunctionComponent } from 'react';
import { Box, Text } from 'rebass';
import { Checkbox } from '../Common';

interface ICheckbox {
  id: string | number;
  title: string;
  checked: boolean;
  onChange(): void;
}

interface IProps {
  checkboxes: ICheckbox[];
}

const Subscriptions: FunctionComponent<IProps> = (props: IProps) => {
  const { checkboxes } = props;

  return (
    <Fragment>
      <Box p={3} bg="lightestgray">
        <Text
          fontWeight="bold"
          color="black"
          textAlign="center"
          lineHeight={1.5}
          letterSpacing={1.5}
          p={1}
        >
          Sähköpostitilaukset
        </Text>
      </Box>
      <Box>
        {checkboxes.map((c: ICheckbox) => (
          <Checkbox key={c.id} {...c} />
        ))}
      </Box>
    </Fragment>
  );
};

export default Subscriptions;
