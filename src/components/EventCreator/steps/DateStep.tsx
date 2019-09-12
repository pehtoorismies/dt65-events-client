import React, { FunctionComponent } from 'react';
import { Flex, Text } from 'rebass';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
// @ts-ignore
import { Input } from '@rebass/forms';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import { DateUtils } from 'react-day-picker';
import BaseStep from './BaseStep';
import { RightArrowButton, LeftArrowButton } from '../../Common';
import { isNullOrUndefined } from '../../../util/general';

interface IProps {
  date?: Date;
  time?: string;
  setDate: (date: Date) => void;
  setTime: (time: string) => void;
  toPrevStep: any;
  toNextStep: any;
}

const parseDate = (str: any, format: any, locale: any) => {
  // @ts-ignore
  const parsed = dateFnsParse(str, format, { locale });
  if (DateUtils.isDate(parsed)) {
    return parsed;
  }
  return undefined;
};

const formatDate = (date: any, format: any, locale: any) => {
  return dateFnsFormat(date, format, { locale });
};

const FORMAT = 'dd.MM.yyyy';

const CustomInput = (props: any) => {
  return <Input textAlign="center" variant="event" width={150} {...props} />;
};

const DateStep: FunctionComponent<IProps> = (props: IProps) => {
  const { date, time, toNextStep, toPrevStep, setDate, setTime } = props;

  return (
    <BaseStep title="Päivämäärä ja aika">
      <Flex
        width="100%"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Text p={3}>Päivämäärä valinta (klikkaa tai kirjoita)</Text>
        <DayPickerInput
          component={CustomInput}
          formatDate={formatDate}
          format={FORMAT}
          parseDate={parseDate}
          value={date}
          placeholder="Anna pvm*"
          onDayChange={day => setDate(day)}
          dayPickerProps={{
            todayButton: 'Tämä päivä',

            months: [
              'Tammikuu',
              'Helmikuu',
              'Maaliskuu',
              'Huhtikuu',
              'Toukokuu',
              'Kesäkuu',
              'Heinäkuu',
              'Elokuu',
              'Syyskuu',
              'Lokakuu',
              'Marraskuu',
              'Joulukuu',
            ],
            weekdaysLong: [
              'Sunnuntai',
              'Maanantai',
              'Tiistai',
              'Keskiviikko',
              'Torstai',
              'Perjantai',
              'Lauantai',
            ],
            weekdaysShort: ['Su', 'Ma', 'Ti', 'Ke', 'To', 'Pe', 'La'],
            firstDayOfWeek: 1,
            labels: {
              nextMonth: 'Seuraava kuu',
              previousMonth: 'Edellinen kuu',
            },
          }}
        />
        <Text p={3}>Valitse mahdollinen aika</Text>
      </Flex>
      <Flex
        my={4}
        width="100%"
        alignItems="center"
        justifyContent="space-between"
      >
        <LeftArrowButton onClick={toPrevStep} visible={true} />
        <RightArrowButton
          onClick={toNextStep}
          visible={!isNullOrUndefined(date)}
        />
      </Flex>
    </BaseStep>
  );
};

export default DateStep;
