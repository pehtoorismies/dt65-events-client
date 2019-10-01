import React, { FunctionComponent } from 'react';
import { Flex, Image, Text } from 'rebass';

import fingerUp from '../../images/fingerUp.jpg';
import { colors } from '../../theme';
import { Button } from '../Common';

interface IProps {
  message?: string;
  title?: string;
  buttonTitle?: string;
  onGetMeOut: () => void;
}

const ErrorPage: FunctionComponent<IProps> = (props: IProps) => {
  const {
    message = 'Sisältöä ei löytynyt',
    title = 'PUMMI',
    onGetMeOut,
    buttonTitle = 'Poistu',
  } = props;

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
        src={fingerUp}
        sx={{
          width: ['80%', '50%'],
          borderRadius: '50%',
          border: `6px solid ${colors.pink}`,
        }}
      />
      <Text textAlign="center" lineHeight={1.5} p={3}>
        {message}
      </Text>
      <Button onClick={onGetMeOut}>{buttonTitle}</Button>
    </Flex>
  );
};

export default ErrorPage;
