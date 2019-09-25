import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';

import { MenuFooter } from '../components/Menu';
import { ROUTES } from '../constants';

const FooterMenuContainer: FunctionComponent<RouteComponentProps> = (
  props: RouteComponentProps
) => {
  const { history } = props;

  const go = (route: string) => () => {
    history.push(route);
  };

  const goHome = go(ROUTES.home);
  const goProfile = go(ROUTES.profile);
  const goAddEvent = go(ROUTES.createEvent);

  return (
    <MenuFooter
      onAddEventClick={goAddEvent}
      onHomeClick={goHome}
      onProfileClick={goProfile}
    />
  );
};

export default withRouter(FooterMenuContainer);
