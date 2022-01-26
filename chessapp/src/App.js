import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Layout from './shared/layout/Layout';
import Main from './main/pages/Main';
import PublicGames from './games/pages/PublicGames';
import UserGames from './games/pages/UserGames';
import Login from './user/pages/Login';
import Signup from './user/pages/Signup';
import { AuthContext } from './store/context/auth-context';
import useAuth from './shared/hooks/useAuth';

const App = () => {
  const [token, userId, username, login, logout] = useAuth();

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
