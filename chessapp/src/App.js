import React, { useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';

import Layout from './shared/layout/Layout';
import Main from './main/pages/Main';
import PublicGames from './games/pages/PublicGames';
import UserGames from './games/pages/UserGames';
import Login from './user/pages/Login';
import Signup from './user/pages/Signup';
import { AuthContext } from './store/context/auth-context';

const App = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = () => {
    setIsLoggedIn(true);
    setUserId('Spencer');
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserId(null);
    navigate('/login');
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, userId: userId, login, logout }}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Main />} />
          <Route path='/:gameId' element={<Main />} />
          <Route path='/public' element={<PublicGames />} />
          {isLoggedIn && (
            <Route path='games/:uid' element={<UserGames />} />
          )}
          {!isLoggedIn && <Route path='login' element={<Login />} />}
          {!isLoggedIn && <Route path='signup' element={<Signup />} />}
          <Route path='*' element={<Navigate to='/' />} />
        </Route>
      </Routes>
    </AuthContext.Provider>
  );
};

export default App;
