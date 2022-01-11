import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';

const NavLinks = props => {
  return (
    <ul className='nav-links'>
      <li>
        <NavLink to='/'>Home</NavLink>
      </li>
      <li>
        <NavLink to='/public'>Public Games</NavLink>
      </li>
      <li>
        <NavLink to='games/you'>Your Games</NavLink>
      </li>
      <li>
        <NavLink to='login'>Login</NavLink>
      </li>
      <li>
        <NavLink to='signup'>Sign Up</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;