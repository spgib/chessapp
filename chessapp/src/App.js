import React, { Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Layout from './shared/layout/Layout';
import Main from './main/pages/Main';
// import PublicGames from './games/pages/PublicGames';
// import UserGames from './games/pages/UserGames';
// import Login from './user/pages/Login';
// import Signup from './user/pages/Signup';
import { AuthContext } from './store/context/auth-context';
import useAuth from './shared/hooks/useAuth';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';

const PublicGames = React.lazy(() => import('./games/pages/PublicGames'));
const UserGames = React.lazy(() => import('./games/pages/UserGames'));
const Login = React.lazy(() => import('./user/pages/Login'));
const Signup = React.lazy(() => import('./user/pages/Signup'));

const App = () => {
  const [token, userId, username, login, logout] = useAuth();

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token, userId, username, login, logout }}
    >
      <Routes>
        <Route path='/' element={<Layout />}>
          <Suspense fallback={<LoadingSpinner />}>
            <Route index element={<Main />} />
            <Route path='/public/:publicGameId' element={<Main />} />
            <Route path='/user/:userGameId' element={<Main />} />
            <Route path='/public' element={<PublicGames />} />
            {token && <Route path='games/:uid' element={<UserGames />} />}
            {!token && <Route path='login' element={<Login />} />}
            {!token && <Route path='signup' element={<Signup />} />}
            <Route path='*' element={<Navigate to='/' />} />
          </Suspense>
        </Route>
      </Routes>
    </AuthContext.Provider>
  );
};

export default App;
