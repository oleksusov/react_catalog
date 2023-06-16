import { NavLink } from 'react-router-dom';

import React from 'react';

export const Logo: React.FC = () => {
  return (
    <NavLink to="home">
      <img
        src="img/icons/logo.svg"
        alt="logo"
      />
    </NavLink>
  );
};
