import React, { FunctionComponent } from 'react';
import useReactRouter from 'use-react-router';

import { MenuFooter } from '../components/Menu';
import { ROUTES } from '../constants';

const FooterMenuContainer: FunctionComponent = () => {
  const { history } = useReactRouter();

  const go = (route: string) => () => {
    history.push(route);
  };

  const goHome = go(ROUTES.home);
  const goProfile = go(ROUTES.profile);
  const goAddEvent = go(ROUTES.createEvent);
  const goUserList = go(ROUTES.userList);

  return (
    <MenuFooter
      onAddEventClick={goAddEvent}
      onHomeClick={goHome}
      onProfileClick={goProfile}
      onUserListClick={goUserList}
    />
  );
};

export default FooterMenuContainer;
