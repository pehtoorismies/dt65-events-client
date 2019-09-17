import React from 'react';
import assoc from 'ramda/es/assoc';
import TypeStep from './steps/TypeStep';
import RaceStep from './steps/RaceStep';
import TitleStep from './steps/TitleStep';
import DateStep from './steps/DateStep';
import TimeStep from './steps/TimeStep';
import CreateStep from './steps/CreateStep';
import DescriptionStep from './steps/DescriptionStep';
import { EVENT_TYPES } from '../../constants';
import { isNullOrUndefined } from '../../util/general';
import { IEventState, ITime, EventType } from '../../types';

const STEPS = {
  TYPE: 0,
  RACE: 1,
  TITLE: 2,
  DATE: 2,
  TIME: 3,
  DESCRIPTION: 4,
  PREVIEW: 5,
};

const getStep = (
  step: number,
  setStep: any,
  eventState: IEventState,
  setEventState: (eventState: IEventState) => void
) => {
  const setType = (eventType: EventType) => {
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
    setEventState(
      assoc('subtitle', subtitle, { ...eventState, title, subtitle })
    );
  };

  const setDate = (date: Date): void => {
    setEventState(assoc('date', date, eventState));
  };
  const setTime = (time: ITime): void => {
    setEventState(assoc('time', time, eventState));
  };
  const setTimeEnabled = (timeEnabled: boolean): void => {
    setEventState(assoc('timeEnabled', timeEnabled, eventState));
  };

  const setDescription = (description?: string) => {
    setEventState(assoc('description', description, eventState));
  };

  const toNext = (currentStep: number) => () => {
    setStep(currentStep + 1);
  };
  const toPrev = (currentStep: number) => () => {
    setStep(currentStep - 1);
  };

  if (step === STEPS.TYPE) {
    return (
      <TypeStep
        setSelectedType={setType}
        selectedType={eventState.type}
        types={EVENT_TYPES}
        toNextStep={toNext(STEPS.TYPE)}
        toPrevStep={toPrev(STEPS.TYPE)}
      />
    );
  }

  if (step === STEPS.RACE) {
    return (
      <RaceStep
        isRace={eventState.race}
        setRace={setRace}
        toNextStep={toNext(STEPS.RACE)}
        toPrevStep={toPrev(STEPS.RACE)}
      />
    );
  }
  if (step === STEPS.TITLE) {
    return (
      <TitleStep
        title={eventState.title}
        subtitle={eventState.subtitle}
        setTitles={setTitles}
        toNextStep={toNext(STEPS.TITLE)}
        toPrevStep={toPrev(STEPS.TITLE)}
      />
    );
  }

  if (step === STEPS.DATE) {
    return (
      <DateStep
        date={eventState.date}
        setDate={setDate}
        toNextStep={toNext(STEPS.DATE)}
        toPrevStep={toPrev(STEPS.DATE)}
      />
    );
  }

  if (step === STEPS.TIME) {
    return (
      <TimeStep
        time={eventState.time}
        setTime={setTime}
        timeEnabled={eventState.timeEnabled}
        setTimeEnabled={setTimeEnabled}
        toNextStep={toNext(STEPS.TIME)}
        toPrevStep={toPrev(STEPS.TIME)}
      />
    );
  }

  if (step === STEPS.DESCRIPTION) {
    return (
      <DescriptionStep
        description={eventState.description}
        setDescription={setDescription}
        toNextStep={toNext(STEPS.DESCRIPTION)}
        toPrevStep={toPrev(STEPS.DESCRIPTION)}
      />
    );
  }

  if (step === STEPS.PREVIEW) {
    return (
      <CreateStep
        username="jioura"
        eventState={eventState}
        toNextStep={toNext(STEPS.PREVIEW)}
        toPrevStep={toPrev(STEPS.PREVIEW)}
      />
    );
  }

  return <h1>END</h1>;
};

export default getStep;