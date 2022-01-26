const pool = require('../db/pool');

class UserRepo {
  static async find() {
    const { rows } = await pool.query('SELECT * FROM users;');

    return rows;
  }

  static async findByEmail(email) {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE email = $1;',
      [email]
    );

    return rows[0];
  }

  static async insert(username, email, password) {
    const { rows } = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *;',
      [username, email, password]
    );

    return rows[0];
  }
}

module.exports = UserRepo;
