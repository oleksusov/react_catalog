import './Header.scss';

import React from 'react';
import { CartButton } from '../CartButton';
import { FavouritesButton } from '../FavouritesButton';
import { Logo } from '../Logo';
import { Navbar } from '../Navbar';

export const Header: React.FC = () => {
  return (
    <header className="page__header header">
      <div className="header__left">
        <Logo />

        <Navbar />
      </div>

      <div className="header__right">
        <FavouritesButton />

        <CartButton />
      </div>
    </header>
  );
};
