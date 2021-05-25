const pool = require('../utils/pool');

module.exports = class ShortUrl {
  id;
  originalUrl;

  constructor(row) {
    this.id = row.id;
    this.originalUrl = row.original_url;
  }

  static async insert(shortUrl) {
    const { rows } = await pool.query(
      'INSERT INTO short_urls (id, original_url) VALUES ($1, $2) RETURNING *',
      [shortUrl.id, shortUrl.originalUrl]
    );

    return new ShortUrl(rows[0]);
  }

  static async find()  {
    const { rows } = await pool.query('SELECT * FROM short_urls');

    return rows.map(row => new ShortUrl(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM short_urls WHERE id=$1',
      [id]
    );

    if(!rows[0]) throw new Error(`Unable to find short url with id ${id}`);
    return new ShortUrl(rows[0]);
  }
};
