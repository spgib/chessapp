import React from 'react';
import { Link } from 'react-router-dom';

import Header from './Header';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';

import './MainNavigation.css';

const MainNavigation = props => {
  return (
    <Header>
      <button className='main-navigation__menu-btn'>
        <span />
        <span />
        <span />
      </button>

      <h1 className='main-navigation__title'>
        <Link to="/">ChessApp</Link>
      </h1>
      <nav className='main-navigation__header-nav'>
        <NavLinks />
      </nav>
    </Header>
  )
};

export default MainNavigation;