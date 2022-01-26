import { useState, useEffect, useCallback } from 'react';

let logoutTime;

const useAuth = () => {
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

  return [token, userId, username, login, logout];
};

export default useAuth;
