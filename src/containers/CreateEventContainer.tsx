import { useMutation } from '@apollo/react-hooks';
import compose from '@shopify/react-compose';
import { isBefore } from 'date-fns';
import parseISO from 'date-fns/parseISO';
import findIndex from 'ramda/es/findIndex';
import insert from 'ramda/es/insert';
import replace from 'ramda/es/replace';
import React, { FunctionComponent } from 'react';
import { toast } from 'react-toastify';
import useReactRouter from 'use-react-router';

import EventWizard from '../components/EventWizard';
import { ROUTES } from '../constants';
import { CREATE_EVENT, EVENTS_QUERY } from '../gql';
import withUser, { IUserProps } from '../hoc/withUser';
import { IEventReq, IEventResp } from '../types';

const CreateEventContainer: FunctionComponent<IUserProps> = (
  props: IUserProps
) => {
  const {
    user: { nickname },
  } = props;

  const { history } = useReactRouter();

  const [createEventQuery] = useMutation(CREATE_EVENT, {
    update: (cache, { data: { createEvent } }) => {
      const resp: any = cache.readQuery({ query: EVENTS_QUERY });
      const cachedEvents = resp.findManyEvents;
      const createdDate: Date = parseISO(createEvent.date);

      const comparison = (cachedEvt: any) => {
        const cachedDate: Date = parseISO(cachedEvt.date);
        return isBefore(createdDate, cachedDate);
      };
      const idx = findIndex(comparison)(cachedEvents);
      const updated = insert(idx, createEvent, cachedEvents);

      cache.writeQuery({
        query: EVENTS_QUERY,
        data: { findManyEvents: updated },
      });
    },
    onCompleted: (data: any) => {
      const {
        createEvent: { id },
      }: { createEvent: IEventResp } = data;
      const url = replace(/:id/g, String(id), ROUTES.viewEvent);
      history.push(url);
      toast(`Tapahtuma luotu`);
    },
  });

  const onCancel = () => history.push(ROUTES.home);

  const applyEvent = async (evt: IEventReq) => {
    try {
      await createEventQuery({
        variables: {
          ...evt,
          addMe: evt.creatorJoining,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <EventWizard
      applyEvent={applyEvent}
      nickname={nickname}
      onCancel={onCancel}
    />
  );
};

export default compose(
  withUser,
)(CreateEventContainer);
