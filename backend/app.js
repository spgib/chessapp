const express = require('express');

const usersRoutes = require('./routes/users-routes');
const gamesRoutes = require('./routes/games-routes');

const app = express();
const port = 5000;

app.use(express.json());

app.get('/', (req, res, next) => {
  console.log('test');
  next();
});

app.use('/api/users', usersRoutes);
app.use('/api/games', gamesRoutes);

app.listen(port);