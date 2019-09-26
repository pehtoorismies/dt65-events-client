import React, { FunctionComponent, ReactNode } from 'react';
import { FallbackProps } from 'react-error-boundary';
import { Flex, Text, Image } from 'rebass';
import { Button } from '../Common';

interface IProps extends FallbackProps {
  onGetMeOut: () => void;
}

const ShowError: FunctionComponent<IProps> = (props: IProps) => {
  const { componentStack, onGetMeOut } = props;

  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center">
      <Text
        fontWeight="bold"
        fontSize={[5, 6, 7]}
        textAlign="center"
        lineHeight={1.5}
        p={3}
      >
        Virhus
      </Text>
      <Button onClick={onGetMeOut}>POISTU</Button>
      <Text textAlign="center" lineHeight={1.5} p={3}>
        Mailaa alla oleva virhe hello(a)downtown65.com ja kerro mitä kävi.
      </Text>

      <Text
        bg="lightestgray"
        m={1}
        sx={{ border: '1px solid grey' }}
        fontFamily="monospace"
        fontSize={1}
        lineHeight={1.5}
        p={3}
      >
        {componentStack}
      </Text>
    </Flex>
  );
};

export default ShowError;
