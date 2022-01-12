import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../../store/context/auth-context';

import './NavLinks.css';

const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  
  return (
    <ul className='nav-links'>
      <li>
        <NavLink to='/'>Home</NavLink>
      </li>
      <li>
        <NavLink to='/public'>Public Games</NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to='games/you'>Your Games</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to='login'>Login</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to='signup'>Sign Up</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>LOG OUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
