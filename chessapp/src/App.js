import React, { useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';

import Layout from './shared/layout/Layout';
import Main from './main/pages/Main';
import PublicGames from './games/pages/PublicGames';
import UserGames from './games/pages/UserGames';
import Login from './user/pages/Login';
import Signup from './user/pages/Signup';
import { AuthContext } from './store/context/auth-context';

// const DUMMY_GAMES = [
//   {
//     id: 1,
//     userId: 'Spencer',
//     title: 'A sample game',
//     wPlayer: 'me',
//     bPlayer: 'someone else',
//     description: 'a very clever strategy',
//     turns: 10,
//     checkmate: false,
//     resignation: false,
//     winner: null,
//     public: true,
//     string:
//       'e4 d5 exd5 Qd6 Qf3 Qe6+ dxe6 a6 Qc6+ Bd7 exd7+ Nxd7 Qxc7 Nb6 a3 Ra7 Qxb6 a5 Qc7 b6',
//   },
//   {
//     id: 2,
//     userId: 'Jasmin',
//     title: 'A tremendous game',
//     wPlayer: 'me',
//     bPlayer: 'someone else',
//     description: 'a very VERY clever strategy',
//     turns: 10,
//     checkmate: false,
//     resignation: false,
//     winner: null,
//     public: true,
//     string:
//       'e4 d5 exd5 Qd6 Qf3 Qe6+ dxe6 a6 Qc6+ Bd7 exd7+ Nxd7 Qxc7 Nb6 a3 Ra7 Qxb6 a5 Qc7 b6',
//   },
//   {
//     id: 3,
//     userId: 'Jasmin',
//     title: 'A terrific game',
//     wPlayer: 'me',
//     bPlayer: 'someone else',
//     description: 'a very VERY clever strategy',
//     turns: 10,
//     checkmate: false,
//     resignation: false,
//     winner: null,
//     public: false,
//     string:
//       'e4 d5 exd5 Qd6 Qf3 Qe6+ dxe6 a6 Qc6+ Bd7 exd7+ Nxd7 Qxc7 Nb6 a3 Ra7 Qxb6 a5 Qc7 b6',
//   },
// ];

const App = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState(null);

  const login = (uid, name, token) => {
    setUserId(uid);
    setName(name);
    setToken(token);
    navigate('/');
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    setName(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token, userId, name, login, logout }}
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
