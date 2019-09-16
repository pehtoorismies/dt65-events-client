import React, { FunctionComponent, useState } from 'react';
import { Box, Card, Flex, Text } from 'rebass';
import styled from '@emotion/styled';
import { map } from 'ramda';
import { Medal } from 'styled-icons/fa-solid/Medal';
import AnimateHeight from 'react-animate-height';
import HeadCountButton from '../HeadCountButton';
import { isParticipating } from '../../util/general';
import { IParticipant, IEvent } from '../../types';
import dateFnsFormat from 'date-fns/format';

interface IProps extends IEvent {
  username: string;
  eventImage?: string;
  joinEvent?: (join: boolean) => void;
  stayOpened?: boolean;
}

const ANIM_TIME = 500;

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

const Race = styled(Medal)`
  color: white;
  width: 30px;
  padding: 4px;
`;

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
    <Pill bg={color} justifyContent="center" alignItems="center" p={1} key={id}>
      <Text px={1} fontSize={10} color="white">
        {usr}
      </Text>
    </Pill>
  );
};

const EventCard: FunctionComponent<IProps> = (props: IProps) => {
  const {
    date,
    description,
    eventImage,
    joinEvent,
    participants,
    subtitle,
    time,
    title,
    type,
    username,
    race,
    stayOpened,
  } = props;

  const isParticipant = isParticipating(username, participants);

  const onJoinClick = (e: any) => {
    e.stopPropagation();
    if (joinEvent) {
      joinEvent(!isParticipant);
    }
  };
  const raceElem = race ? <Race /> : null;

  const exposeDetails = () => {
    if (!stayOpened) {
      setShowDetails(!showDetails);
    }
  };
  const [showDetails, setShowDetails] = useState(stayOpened);

  return (
    <Flex
      p={2}
      bg="white"
      width="100%"
      sx={{ maxWidth: 400 }}
      onClick={exposeDetails}
    >
      <Card width="100%" mx="auto" variant="shadow">
        <ImageBox bgImage={eventImage || type.defaultImage}>
          <Text
            letterSpacing={4}
            color="white"
            fontSize={30}
            fontWeight={900}
            sx={{
              textShadow: '2px 2px 5px black',
            }}
          >
            {type.title}
          </Text>
          {raceElem}
        </ImageBox>
        <Flex p={2} bg="darkWhite" justifyContent="space-between">
          <Flex justifyContent="space-around" flexDirection="column">
            <Text fontSize={20} fontWeight="bold">
              {title}
            </Text>
            <Text fontSize={16} fontWeight="bold">
              {subtitle}
            </Text>
            <Text mt={1} fontSize={16}>
              {dateFnsFormat(date, 'dd.MM.yyyy')}
            </Text>
          </Flex>
          <Flex alignItems="center" justifyContent="center">
            <HeadCountButton
              count={participants.length}
              onClick={onJoinClick}
              isParticipating={isParticipant}
            />
          </Flex>
        </Flex>
        <AnimateHeight duration={ANIM_TIME} height={showDetails ? 'auto' : 0}>
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
              <Text ml={1}>{time}</Text>
            </Flex>
            <Flex flexWrap="wrap" py={1}>
              {map(renderPill(username), participants)}
            </Flex>
            <Text fontWeight="bold" color="lightBlack" width={60}>
              Kuvaus:
            </Text>
            <Text my={2}>{description}</Text>
          </Box>
        </AnimateHeight>
      </Card>
    </Flex>
  );
};

export default EventCard;
