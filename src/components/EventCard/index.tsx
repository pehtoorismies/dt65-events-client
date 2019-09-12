import React, { FunctionComponent } from 'react';
import { Box, Card, Flex, Text } from 'rebass';
import { map } from 'ramda';
// import AnimateHeight from 'react-animate-height';
import bgImage from '../../images/test_mini.jpg';
import HeadCountButton from '../HeadCountButton';

import { IParticipant } from '../../types';

interface IProps {
  username: string;
  participants: IParticipant[];
}

const ImageBox = (props: any) => (
  <Flex
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    width="100%"
    height={150}
    position="relative"
    {...props}
    sx={{
      backgroundSize: 'cover',
      borderRadius: '15px 15px 0 0',
      fontWeight: 'bold',
      height: '15px',
      width: '100%',
      backgroundImage: `url(${props.bgImage})`,
    }}
  />
);

const Pill = (props: any) => (
  <Flex
    {...props}
    margin="2px"
    sx={{
      borderRadius: '4px',
    }}
  />
);

const renderPill = (username: string) => (participant: IParticipant) => {
  const { username: usr, id } = participant;
  const color = username === usr ? 'pink' : 'blue';

  return (
    <Pill bg={color} justifyContent="center" alignItems="center" p={2} key={id}>
      <Text px={1} fontSize={14} color="white">
        {usr}
      </Text>
    </Pill>
  );
};

const EventCard: FunctionComponent<IProps> = (props: IProps) => {
  const { username, participants } = props;

  return (
    <Flex p={2} bg="white" width="100%" sx={{ maxWidth: 400 }}>
      <Card width="100%" mx="auto" variant="shadow">
        <ImageBox bgImage={bgImage}>
          <Text
            letterSpacing={4}
            color="white"
            fontSize={30}
            fontWeight={900}
            sx={{
              textShadow: '2px 2px 5px black',
            }}
          >
            Event type
          </Text>
        </ImageBox>
        <Flex p={2} bg="darkWhite" justifyContent="space-between">
          <Flex justifyContent="space-around" flexDirection="column">
            <Text fontSize={20} fontWeight="bold">
              Some title
            </Text>
            <Text fontSize={16} fontWeight="bold">
              Subtitle
            </Text>
            <Text fontSize={16}>10.10.2021</Text>
          </Flex>
          <Flex alignItems="center" justifyContent="center">
            <HeadCountButton
              count={12}
              onClick={() => {
                
              }}
              highlighted={false}
            />
          </Flex>
        </Flex>

        <Box px={2} pt={1}>
          <Flex>
            <Text fontWeight="bold" color="lightBlack" width={60}>
              Sijainti:
            </Text>
            <Text ml={1}>Address</Text>
          </Flex>
          <Flex my={1}>
            <Text fontWeight="bold" color="lightBlack" width={60}>
              Aika:
            </Text>
            <Text ml={1}>10:00</Text>
          </Flex>
          <Flex flexWrap="wrap" py={1}>
            {map(renderPill(username), participants)}
          </Flex>
          <Text fontWeight="bold" color="lightBlack" width={60}>
            Kuvaus:
          </Text>
          <Text my={2}>lorem ipsum</Text>
        </Box>
      </Card>
    </Flex>
  );
};

export default EventCard;
