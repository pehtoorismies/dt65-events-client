import React, { Fragment, FunctionComponent, Suspense } from 'react';
import { Box, Flex } from 'rebass';
import useReactRouter from 'use-react-router';

import ViewChooser from '../components/ViewChooser';
import { ROUTES } from '../constants';
import { VIEW } from '../types';
import Loader from '../components/Loader';

const EventListContainer = React.lazy(() => import('./EventListContainer'));

const EventListViewContainer: FunctionComponent = () => {
  const { history } = useReactRouter();
  const toCalendarView = () => history.push(ROUTES.calendar);

  return (
    <Fragment>
      <Box sx={{ position: 'sticky', top: 40 }} width="100%">
        <ViewChooser onChooseType={toCalendarView} selectedView={VIEW.LIST} />
      </Box>
      <Flex flexDirection="column" alignItems="center" width="100%">
        <Suspense fallback={<Loader />}>
          <EventListContainer />
        </Suspense>
      </Flex>
    </Fragment>
  );
};

export default EventListViewContainer;
