const app = require('./app');
const pool = require('./db/pool');
const connectionString = process.env.DATABASE_URL;

pool
  .connect({
    connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  })
  .then(() => {
    app().listen(process.env.PORT || 5000, () => {
      console.log('Listening on port 5000.');
    });
  })
  .catch((err) => {
    console.error(err);
  });
