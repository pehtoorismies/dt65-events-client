import React from 'react';
import EventCreator from '../components/EventCreator';
import { Text } from 'rebass';

const EventsContainer = () => {
  return (
    <EventCreator createEvent={(e) => console.log('moi', e)} username="koira" />
    
    
      
  );
};

export default EventsContainer;
