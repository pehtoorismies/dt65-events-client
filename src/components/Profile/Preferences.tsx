import styled from '@emotion/styled';
import map from 'ramda/es/map';
import React, { Fragment, FunctionComponent, useState } from 'react';
import Switch from 'react-switch';
import { Flex, Heading, Text } from 'rebass';

import { colors } from '../../theme';
import { IPreferences } from '../../types';
import { Button } from '../Common';
import assoc from 'ramda/es/assoc';
import deepEqual from 'deep-equal';

interface IProps {
  preferences: IPreferences;
  loading: boolean;
  // TODO: proper signature
  onUpdate: (preferences: IPreferences) => void;
  onSave?: () => void;
}

interface IRenderProps {
  text: string;
  key: string;
  value: boolean;
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto 80px;
  grid-template-rows: auto;
  align-items: center;
`;

const renderPreference = (onChange: (key: string, value: boolean) => void) => (
  rp: IRenderProps
) => {
  const { text, key, value } = rp;
  const weight = value ? 'bold' : 'normal';
  const color = value ? 'darkGray' : 'lightgray';

  const onSwitchChange = () => {
    onChange(key, !value);
  };

  return (
    <Grid key={key}>
      <Flex py={2}>
        <Text ml={2} fontSize={[2, 3, 4]} color={color} fontWeight={weight}>
          {text}
        </Text>
      </Flex>
      <Flex py={2} my={1} alignItems="center" justifyContent="center">
        <Switch
          offColor={colors.blue}
          onColor={colors.pink}
          offHandleColor={colors.white}
          onHandleColor={colors.white}
          onChange={onSwitchChange}
          checked={value}
        />
      </Flex>
    </Grid>
  );
};

const Preferences: FunctionComponent<IProps> = (props: IProps) => {
  const { preferences, onUpdate, loading } = props;
  const [prefs, setPrefs] = useState<IPreferences>(preferences);

  const disabled = deepEqual(preferences, prefs);
    
  const prefsRows: IRenderProps[] = [
    {
      key: 'subscribeEventCreationEmail',
      text: '  Lähetä sähköposti, kun uusi tapahtuma luodaan.',
      value: prefs.subscribeEventCreationEmail,
    },
    {
      key: 'subscribeWeeklyEmail',
      text: 'Lähetä viikon tapahtumat sähköpostitse.',
      value: prefs.subscribeWeeklyEmail,
    },
  ];

  const updatePreferences = (key: string, value: boolean) => {
    const newState = assoc(key, value, prefs);
    setPrefs(newState);
  };

  const submit = () => {
    onUpdate(prefs);
  };
  
  return (
    <Fragment>
      <Heading my={3}>Asetukset</Heading>
      <Flex width="100%" flexDirection="column">
        {map(renderPreference(updatePreferences), prefsRows)}
      </Flex>
      <Button disabled={Boolean(disabled || loading)} loading={loading} onClick={submit}>
        Tallenna
      </Button>
    </Fragment>
  );
};

export default Preferences;
