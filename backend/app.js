const express = require('express');

const usersRoutes = require('./routes/users-routes');
const gamesRoutes = require('./routes/games-routes');

module.exports = () => {
  const app = express();
  
  app.use(express.json());
  
  app.use('/api/users', usersRoutes);
  app.use('/api/games', gamesRoutes);

  return app;
}
