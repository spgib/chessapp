const pool = require('../db/pool');

class GameRepo {
  static async findAllPublic() {
    const { rows } = await pool.query(
      'SELECT * FROM games WHERE public = TRUE;'
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
    const { rows } = await pool.query('SELECT * FROM games WHERE id = $1;', [id]);

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

  static async alter(
    title,
    wPlayer,
    bPlayer,
    desc,
    turns,
    checkmate,
    resig,
    winner,
    isPublic,
    string
  ) {}

  static async delete(id) {
    const { rows } = await pool.query('DELETE FROM games WHERE id = $1 RETURNING *;', [id]);

    return rows[0];
  }
}

module.exports = GameRepo;
