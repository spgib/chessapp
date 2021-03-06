const pg = require('pg');

class Pool {
  _pool = null;

  async connect(options) {
    this._pool = new pg.Pool(options);

    let retries = 5;
    while (retries) {
      try {
        await this._pool.query('SELECT 1 + 1;');
        break;
      } catch (err) {
        console.log(err);
        retries -= 1;
        await new Promise(res => setTimeout(res, 5000));
      }
    }

    if (retries === 0) {
      throw new Error('Could not connect to database!');
    }
  }

  init() {
    this._pool.query(`CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      username VARCHAR(50) NOT NULL UNIQUE,
      email VARCHAR(50) NOT NULL UNIQUE,
      password VARCHAR(100) NOT NULL
    );`);

    this._pool.query(`CREATE TABLE IF NOT EXISTS games (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      title VARCHAR(50) NOT NULL,
      wplayer VARCHAR(50),
      bplayer VARCHAR(50),
      description VARCHAR(200),
      turns INTEGER NOT NULL,
      checkmate BOOLEAN NOT NULL,
      resignation BOOLEAN NOT NULL,
      winner VARCHAR(3) DEFAULT '',
      public BOOLEAN NOT NULL,
      string VARCHAR NOT NULL
    );`);
  }

  close() {
    return this._pool.end();
  }

  query(sql, params) {
    return this._pool.query(sql, params);
  }
}

module.exports = new Pool();
