import React, { Fragment, FunctionComponent, Suspense } from 'react';
import { Box, Flex } from 'rebass';
import useReactRouter from 'use-react-router';

import Loader from '../components/Loader';
import ViewChooser from '../components/ViewChooser';
import { MEASURES, ROUTES } from '../constants';
import { VIEW } from '../types';

const EventCalendarContainer = React.lazy(() =>
  import('./EventCalendarContainer')
);

const EventCalendarViewContainer: FunctionComponent = () => {
  const { history } = useReactRouter();
  const toListView = (type: VIEW) => {
    if (type === VIEW.LIST) {
      history.push(ROUTES.home);
    }
  };

  return (
    <Fragment>
      <Box
        sx={{ position: 'sticky', top: MEASURES.headerHeight, zIndex: 2 }}
        width="100%"
      >
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
