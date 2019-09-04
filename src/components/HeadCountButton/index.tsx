import React, { Fragment, FunctionComponent } from 'react';
import { Box, Text, Flex } from 'rebass';
import { IParticipant} from '../../types';

interface IProps {
  count: number;
  onClick: () => void;
  highlighted: boolean;
  disabled?: boolean;
}

const LoaderIcon = (props: any) => (
  <Box
    width={26}
    height={26}
    bg="white"
    // animation: ${rotate} 1s linear infinite;
  />
);

const Count = (props: any) => (
  <Flex
    width={55}
    height={55}
    bg="white"
    sx={{
      borderRadius: 50,
      border: '2px solid white',
      cursor: 'pointer',
    }}
  />
);



const UserIcon = (props: any) => <Box width={20} height={20} bg="pink" />;

const getContent = (count: number, disabled?: boolean) => {
  if (disabled) {
    return <LoaderIcon />;
  }
  return (
    <Fragment>
      <UserIcon />
      <Text fontSize={18} color="white" fontWeight="bold">
        {count}
      </Text>
    </Fragment>
  );
};

const HeadCountButton: FunctionComponent<IProps> = (props: IProps) => {
  const { count, onClick, highlighted, disabled } = props;

  const content = getContent(count, disabled);
  const clicked = disabled ? null : onClick;

  return (
    <Count
      onClick={clicked}
      bg={highlighted ? 'pink' : 'blue'}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      {content}
    </Count>
  );
};

export default HeadCountButton;
