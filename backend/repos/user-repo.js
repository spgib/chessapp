const pool = require('../db/pool');

class UserRepo {
  static test() {
    console.log('test');
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
