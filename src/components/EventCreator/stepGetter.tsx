import React from 'react';
import { IEventState } from '../../types';
import assoc from 'ramda/es/assoc';
import TypeStep from './steps/TypeStep';
import RaceStep from './steps/RaceStep';
import TitleStep from './steps/TitleStep';
import DateStep from './steps/DateStep';
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
  const setTitles = (title?: string, subtitle?: string) => {
    setEventState(assoc('title', title, eventState));
    setEventState(assoc('subtitle', subtitle, eventState));
  };

  const setDate = (date: Date): void => {
    setEventState(assoc('date', date, eventState));
  };
  const setTime = (time: string): void => {
    setEventState(assoc('time', time, eventState));
  };

  if (step === 0) {
    return (
      <TypeStep
        setSelectedType={setType}
        selectedType={eventState.type}
        types={EVENT_TYPES}
        toNextStep={() => setStep(1)}
      />
    );
  }

  if (step === 1) {
    return (
      <RaceStep
        toPrevStep={() => setStep(0)}
        toNextStep={() => setStep(2)}
        isRace={eventState.race}
        setRace={setRace}
      />
    );
  }
  if (step === 2) {
    return (
      <TitleStep
        toPrevStep={() => setStep(1)}
        toNextStep={() => setStep(3)}
        title={eventState.title}
        subtitle={eventState.subtitle}
        setTitles={setTitles}
      />
    );
  }

  if (step === 3) {
    return (
      <DateStep
        toPrevStep={() => setStep(2)}
        toNextStep={() => setStep(4)}
        time={eventState.time}
        date={eventState.date}
        setDate={setDate}
        setTime={setTime}
      />
    );
  }

  return <h1>END</h1>;
};

export default getStep;
