import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../../store/context/auth-context';

import './NavLinks.css';

const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  
  const logoutHandler = () => {
    auth.logout();
    navigate('/login');
  }

  return (
    <ul className='nav-links'>
      <li>
        <NavLink to='/'>HOME</NavLink>
      </li>
      <li>
        <NavLink to='/public'>PUBLIC GAMES</NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`games/${auth.userId}`}>YOUR GAMES</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to='login'>LOGIN</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to='signup'>SIGN UP</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={logoutHandler}>LOG OUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
