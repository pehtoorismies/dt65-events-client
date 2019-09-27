import { useMutation } from '@apollo/react-hooks';
import compose from '@shopify/react-compose';
import replace from 'ramda/es/replace';
import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import EventWizard from '../components/EventWizard';
import { ROUTES } from '../constants';
import { CREATE_EVENT } from '../gql';
import withUser, { IUserProps } from '../hoc/withUser';
import { IEventReq, IEventResp } from '../types';

const CreateEventContainer: FunctionComponent<
  RouteComponentProps & IUserProps
> = (props: RouteComponentProps & IUserProps) => {
  const {
    history,
    user: { username },
  } = props;

  const [createEventQuery] = useMutation(CREATE_EVENT, {
    refetchQueries: ['findManyEvents'],
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
      username={username}
      onCancel={onCancel}
    />
  );
};

export default compose(
  withUser,
  // @ts-ignore
  withRouter
)(CreateEventContainer);
