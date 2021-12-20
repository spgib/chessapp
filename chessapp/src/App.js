import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from './shared/layout/Layout';
import Main from './main/pages/Main';
import UserGames from './games/pages/UserGames';
import Login from './user/pages/Login';
import Signup from './user/pages/Signup';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Main />} />
        <Route path='games/:uid' element={<UserGames />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
      </Route>
    </Routes>
  );
};

export default App;
