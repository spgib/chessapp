const app = require('./app');
const pool = require('./db/pool');

pool
  .connect({
    host: 'localhost',
    port: 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  })
  .then(() => {
    app().listen(5000, () => {
      console.log('Listening on port 5000.');
    });
  })
  .catch((err) => {
    console.error(err);
  });
