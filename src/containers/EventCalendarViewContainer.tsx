import React, { Fragment, FunctionComponent, Suspense } from 'react';
import { Box, Flex } from 'rebass';
import useReactRouter from 'use-react-router';

import ViewChooser from '../components/ViewChooser';
import { ROUTES } from '../constants';
import { VIEW } from '../types';
import Loader from '../components/Loader';

const EventCalendarContainer = React.lazy(() => import('./EventCalendarContainer'));

const EventCalendarViewContainer: FunctionComponent = () => {
  const { history } = useReactRouter();
  const toListView = () => history.push(ROUTES.home);

  return (
    <Fragment>
      <Box sx={{ position: 'sticky', top: 40 }} width="100%">
        <ViewChooser onChooseType={toListView} selectedView={VIEW.CALENDAR} />
      </Box>
      <Flex flexDirection="column" alignItems="center" width="100%">
        <Suspense fallback={<Loader />}>
          <EventCalendarContainer />
        </Suspense>
      </Flex>
    </Fragment>
  );
};

export default EventCalendarViewContainer;
