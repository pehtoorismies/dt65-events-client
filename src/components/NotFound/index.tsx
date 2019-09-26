import React, { FunctionComponent, ReactNode } from 'react';
import { Flex, Text, Image } from 'rebass';
import { Button } from '../Common';
import notFoundImg from '../../images/404.jpg';
import { colors } from '../../theme';

interface IProps {
  text?: string;
  title?: string;
  onGetMeOut: () => void;
}

const NotFound: FunctionComponent<IProps> = (props: IProps) => {
  const { text = 'Sisältöä ei löytynyt', title = 'PUMMI', onGetMeOut } = props;

  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center">
      <Text
        fontWeight="bold"
        fontSize={[5, 6, 7]}
        textAlign="center"
        lineHeight={1.5}
        p={3}
      >
        {title}
      </Text>
      <Image
        src={notFoundImg}
        sx={{
          width: ['80%', '50%'],
          borderRadius: '50%',
          border: `6px solid ${colors.pink}`,
        }}
      />
      <Text textAlign="center" lineHeight={1.5} p={3}>
        {text}
      </Text>
      <Button onClick={onGetMeOut}>Poistu</Button>
    </Flex>
  );
};

export default NotFound;
