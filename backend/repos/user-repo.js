const pool = require('../db/pool');

class UserRepo {
  static async find() {
    const { rows } = await pool.query('SELECT * FROM users;');

    return rows;
  }

  static async findByEmail(email) {
    const { rows } = await pool.query(
      'SELECT id, email, password FROM users WHERE email = $1;',
      [email]
    );

    return rows[0];
  }

  static async insert(name, email, password) {
    const { rows } = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;',
      [name, email, password]
    );

    return rows;
  }
}

module.exports = UserRepo;
