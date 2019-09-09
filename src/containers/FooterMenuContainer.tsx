import React from 'react';
import { MenuFooter } from '../components/Menu';

const FooterMenuContainer = () => {
  return (
    <MenuFooter
      onAddEventClick={() => console.log('Add event')}
      onHomeClick={() => console.log('Go home')}
      onProfileClick={() => console.log('Show profile')}
    />
  );
};

export default FooterMenuContainer;
