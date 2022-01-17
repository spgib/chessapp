const app = require('./app');
const pool = require('./db/pool');

pool
  .connect({
    host: 'localhost',
    port: 5432,
    database: 'chessapp',
    user: 'postgres',
    password: 'password',
  })
  .then(() => {
    app().listen(5000, () => {
      console.log('Listening on port 5000.');
    });
  })
  .catch((err) => {
    console.error(err);
  });
