// @ts-ignore
import { Input } from '@rebass/forms';
import * as React from 'react';
import { Box, Text } from 'rebass';
import styled from 'styled-components';
// import { Input } from '../Common';

interface IProps {
  label: string;
  error?: string;
  id?: string;
  name: string;
  type?: string;
  placeholder?: string;
}

// color: ${colors('lightgray')};

// const Wrapper = styled.div`
//   display: block;
//   margin-top: 5px;
// `;
// const Span = styled.span`
//   font-size: 10px;
//   font-weight: bold;
//   text-transform: uppercase;

// `;

// <ErrorText mt={1}>{error}</ErrorText>

const FormField: React.FunctionComponent<IProps> = (props: IProps) => {
  const { label, error, id, name, type, placeholder } = props;
  return (
    <Box>
      <Text fontSize={10} fontWeight="bold">
        {label}
      </Text>
      <Input id={id} name={name} type={type} placeholder={placeholder} />
    </Box>
  );
};

// import React from 'react';
// import styled from 'styled-components';
// import { ErrorText, Input } from '../Common';
// import { colors } from '../../util/themeAx';

// const FormField = (props: Props) => {
//   const { label, error } = props;
//   return (
//     <Wrapper>
//       <Span>{label}</Span>
//       <Input {...props} />
//       <ErrorText mt={1}>{error}</ErrorText>
//     </Wrapper>
//   );
// };

// FormField.defaultProps = {
//   error: undefined,
// };

export default FormField;
