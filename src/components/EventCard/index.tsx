import React, { FunctionComponent, useState } from 'react';
import { Box, Card, Flex, Heading, Text } from 'rebass';
import styled from '@emotion/styled';
import { map } from 'ramda';
import { Medal } from 'styled-icons/fa-solid/Medal';
import AnimateHeight from 'react-animate-height';
import HeadCountButton from '../HeadCountButton';
import { isParticipating } from '../../util/general';
import { IParticipant, IEvent, ID } from '../../types';
import parse, { DomElement, domToReact } from 'html-react-parser';

interface IProps extends IEvent {
  id: ID;
  isJoining?: boolean
  username: string;
  eventImage?: string;
  joinEvent?: (eventId: ID) => void;
  stayOpened?: boolean;
}

const ANIM_TIME = 500;

interface IBoxProps {
  bgImage: string;
}

const ImageBox = styled.div<IBoxProps>`
  display: grid;
  background-size: cover;
  border-radius: 15px 15px 0 0;
  font-weight: bold;
  height: 150px;
  width: 100%;
  background-image: url(${(props: IBoxProps) => props.bgImage});
  grid-template-rows: 20px auto 20px;
  justify-items: center;
  align-items: center;
  grid-template-areas:
    'empty'
    'title'
    'creator';
`;

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
    id,
    creator,
    date,
    description,
    eventImage,
    isJoining,
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
      joinEvent(id);
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
          <Flex
            flexDirection="column"
            alignItems="center"
            sx={{ gridArea: 'title' }}
          >
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
          </Flex>

          <Text
            fontSize={11}
            fontFamily="monospace"
            p={1}
            color="white"
            width="100%"
            textAlign="right"
            sx={{
              backgroundImage:
                'linear-gradient(rgba(0,0,0,0.0), rgba(0,0,0,0.6))',
              gridArea: 'creator',
            }}
          >
            by {creator}
          </Text>
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
              {date}
            </Text>
          </Flex>
          <Flex alignItems="center" justifyContent="center">
            <HeadCountButton
              loading={isJoining}
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
            <Text my={2}>
              {parse(description || '', {
                replace: (domNode: DomElement): any => {
                  const { name, children } = domNode;
                  if (!children) {
                    return '';
                  }

                  if (name === 'em') {
                    return (
                      <Text as="span" sx={{ fontStyle: 'italic' }}>
                        {domToReact(children)}
                      </Text>
                    );
                  }
                  if (name === 'strong') {
                    return (
                      <Text as="span" fontWeight="bold">
                        {domToReact(children)}
                      </Text>
                    );
                  }
                  if (name === 'u') {
                    return (
                      <Text as="span" sx={{ fontStyle: 'underline' }}>
                        {domToReact(children)}
                      </Text>
                    );
                  }
                  if (name === 'h1') {
                    return (
                      <Heading fontSize={4}>{domToReact(children)}</Heading>
                    );
                  }
                  if (name === 'ul') {
                    return (
                      <Text p={1}  sx={{ listStyleType: 'circle' }}>
                        {domToReact(children)}
                      </Text>
                    );
                  }
                  if (name === 'ol') {
                    return (
                      <Text p={1} sx={{ listStyleType: 'lower-latin' }}>
                        {domToReact(children)}
                      </Text>
                    );
                  }
                  
                },
              })}
            </Text>
          </Box>
        </AnimateHeight>
      </Card>
    </Flex>
  );
};

export default EventCard;
