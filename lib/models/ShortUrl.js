const pool = require('../utils/pool');

module.exports = class ShortUrl {
  id;
  originalUrl;
  userId;

  constructor(row) {
    this.id = row.id;
    this.originalUrl = row.original_url;
    this.userId = row.user_id;
  }

  static async insert(shortUrl) {
    const { rows } = await pool.query(
      'INSERT INTO short_urls (id, original_url, user_id) VALUES ($1, $2, $3) RETURNING *',
      [shortUrl.id, shortUrl.originalUrl, shortUrl.userId]
    );

    return new ShortUrl(rows[0]);
  }

  static async find()  {
    const { rows } = await pool.query('SELECT * FROM short_urls');

    return rows.map(row => new ShortUrl(row));
  }

  static async findById(id, userId) {
    const { rows } = await pool.query(
      'SELECT * FROM short_urls WHERE id=$1 and user_id=$2',
      [id, userId]
    );

    if(!rows[0]) throw new Error(`Unable to find short url with id ${id}`);
    return new ShortUrl(rows[0]);
  }
};
