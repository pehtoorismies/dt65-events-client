import { useMutation } from '@apollo/react-hooks';
import compose from '@shopify/react-compose';
import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import EventWizard from '../components/EventWizard';
import { ROUTES } from '../constants';
import { CREATE_EVENT } from '../gql';
import withUser, { IUserProps } from '../hoc/withUser';
import { IEventReq } from '../types';

const CreateEventContainer: FunctionComponent<
  RouteComponentProps & IUserProps
> = (props: RouteComponentProps & IUserProps) => {
  const {
    history,
    user: { username },
  } = props;

  const [createEventQuery] = useMutation(CREATE_EVENT, {
    // update(cache, { data: { createEvent } }) {
    //   const resp: any = cache.readQuery({ query: EVENTS_QUERY });
    //   console.log('update');
    //   console.log(resp);
    //   // const { findManyEvents } = resp;
    //   // cache.writeQuery({
    //   //   query: EVENTS_QUERY,
    //   //   data: { findManyEvents: findManyEvents.concat([createEvent]) },
    //   // });
    // },
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

      toast(`Tapahtuma luotu`);
      history.push(ROUTES.home);
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
