const pool = require('../db/pool');

class GameRepo {
  static async findAllPublic() {
    const { rows } = await pool.query(
      'SELECT users.username, games.* FROM users JOIN games ON users.id = games.user_id WHERE public = true;'
    );

    return rows;
  }

  static async findByUser(userId) {
    const { rows } = await pool.query(
      'SELECT * FROM games WHERE user_id = $1',
      [userId]
    );

    return rows;
  }

  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM games WHERE id = $1;', [
      id,
    ]);

    return rows[0];
  }

  static async findPublicInfo(id) {
    const { rows } = await pool.query(
      'SELECT public FROM games WHERE id = $1;',
      [id]
    );

    return rows[0];
  }

  static async insert(gameObject) {
    const {
      userId,
      title,
      wPlayer,
      bPlayer,
      description,
      turns,
      checkmate,
      resignation,
      winner,
      public: isPublic,
      string,
    } = gameObject;

    const { rows } = await pool.query(
      `INSERT INTO games (user_id, title, wplayer, bplayer, description, turns, checkmate, resignation, winner, public, string) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;`,
      [
        userId,
        title,
        wPlayer,
        bPlayer,
        description,
        turns,
        checkmate,
        resignation,
        winner,
        isPublic,
        string,
      ]
    );

    return rows[0];
  }

  static async updateSome(id, gameObject) {
    const {
      title,
      wPlayer,
      bPlayer,
      description,
      public: isPublic,
    } = gameObject;

    const { rows } = await pool.query(
      'UPDATE games SET title = $1, wplayer = $2, bplayer = $3, description = $4, public = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *;',
      [title, wPlayer, bPlayer, description, isPublic, id]
    );

    return rows[0];
  }

  static async updateAll(id, gameObject) {
    const {
      title,
      wPlayer,
      bPlayer,
      description,
      public: isPublic,
      turns,
      checkmate,
      resignation,
      winner,
      string,
    } = gameObject;

    const { rows } = await pool.query(
      'UPDATE games SET title = $1, wplayer = $2, bplayer = $3, description = $4, public = $5, turns = $6, checkmate = $7, resignation = $8, winner = $9, string = $10, updated_at = CURRENT_TIMESTAMP WHERE id = $11 RETURNING *;',
      [
        title,
        wPlayer,
        bPlayer,
        description,
        isPublic,
        turns,
        checkmate,
        resignation,
        winner,
        string,
        id,
      ]
    );

    return rows[0];
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM games WHERE id = $1 RETURNING *;',
      [id]
    );

    return rows[0];
  }
}

module.exports = GameRepo;
