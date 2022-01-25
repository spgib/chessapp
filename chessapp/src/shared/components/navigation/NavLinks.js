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
        <NavLink to='/'>Home</NavLink>
      </li>
      <li>
        <NavLink to='/public'>Public Games</NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`games/${auth.userId}`}>Your Games</NavLink>
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
          <button onClick={logoutHandler}>LOG OUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
