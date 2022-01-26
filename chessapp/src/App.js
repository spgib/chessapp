import React, { useState, useEffect, useCallback } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Layout from './shared/layout/Layout';
import Main from './main/pages/Main';
import PublicGames from './games/pages/PublicGames';
import UserGames from './games/pages/UserGames';
import Login from './user/pages/Login';
import Signup from './user/pages/Signup';
import { AuthContext } from './store/context/auth-context';

let logoutTime;

const App = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState(null);

  const login = useCallback((userId, username, token, expiration) => {
    setUserId(userId);
    setUsername(username);
    setToken(token);
    const tokenExpiration =
      expiration || new Date().getTime() + 1000 * 60 * 60;
    setTokenExpirationDate(tokenExpiration);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId,
        username,
        token,
        expiration: tokenExpiration,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setUsername(null);
    setTokenExpirationDate(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (
      userData &&
      userData.token &&
      new Date(userData.expiration) > new Date()
    ) {
      login(
        userData.userId,
        userData.username,
        userData.token,
        userData.expiration
      );
    }
  }, [login]);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = new Date(tokenExpirationDate).getTime() - new Date().getTime();
      logoutTime = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTime);
    }
  }, [token, logout, tokenExpirationDate]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token, userId, username, login, logout }}
    >
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Main />} />
          <Route path='/:gameId' element={<Main />} />
          <Route path='/public' element={<PublicGames />} />
          {token && <Route path='games/:uid' element={<UserGames />} />}
          {!token && <Route path='login' element={<Login />} />}
          {!token && <Route path='signup' element={<Signup />} />}
          <Route path='*' element={<Navigate to='/' />} />
        </Route>
      </Routes>
    </AuthContext.Provider>
  );
};

export default App;
