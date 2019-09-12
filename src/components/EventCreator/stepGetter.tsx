import React from 'react';
import { IEventState } from '../../types';
import assoc from 'ramda/es/assoc';
import TypeStep from './steps/TypeStep';
import RaceStep from './steps/RaceStep';
import TitleStep from './steps/TitleStep';
import { EVENT_TYPES } from '../../constants';
import { isNullOrUndefined } from '../../util/general';

const getStep = (
  step: number,
  setStep: any,
  eventState: IEventState,
  setEventState: (eventState: IEventState) => void
) => {
  const setType = (eventType: string) => {
    if (!eventState.type) {
      setStep(1);
    }
    setEventState(assoc('type', eventType, eventState));
  };
  const setRace = (isRace: boolean) => {
    if (isNullOrUndefined(eventState.race)) {
      setStep(2);
    }
    setEventState(assoc('race', isRace, eventState));
  };
  const setTitles = (title: string, subtitle?: string) => {
    setEventState(assoc('title', title, eventState));
    setEventState(assoc('subtitle', subtitle, eventState));
    setStep(3);
  };
  

  if (step === 0) {
    return (
      <TypeStep
        setSelectedType={setType}
        selectedType={eventState.type}
        types={EVENT_TYPES}
      />
    );
  }

  if (step === 1) {
    return <RaceStep isRace={eventState.race} setRace={setRace} />;
  }
  if (step === 2) {
    return (
      <TitleStep
        title={eventState.title}
        subtitle={eventState.subtitle}
        setTitles={setTitles}
      />
    );
  }

  return <h1>moi</h1>;
};

export default getStep;
