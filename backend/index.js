const app = require('./app');
const pool = require('./db/pool');
// const connectionString = process.env.DATABASE_URL;

const { HOST, DB_PORT, DB, USER, PASSWORD, PORT } = process.env;
console.log(process.env);
pool
  .connect({
    HOST,
    DB_PORT,
    DB,
    USER,
    PASSWORD,
  })
  .then(() => {
    pool.init();
    console.log('Initialized database.');
  })
  .then(() => {
    app().listen(PORT || 5000, () => {
      console.log('Listening on port 5000.');
    });
  })
  .catch((err) => {
    console.error(err);
  });
