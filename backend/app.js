const express = require('express');

const usersRoutes = require('./routes/users-routes');
const gamesRoutes = require('./routes/games-routes');

module.exports = () => {
  const app = express();

  app.use(express.json());

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
  });

  app.use('/api/users', usersRoutes);
  app.use('/api/games', gamesRoutes);

  app.use((error, req, res, next) => {
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred.' });
  });

  return app;
};
