DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS short_urls;

CREATE TABLE users(
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL
);

CREATE TABLE short_urls (
  id TEXT PRIMARY KEY,
  original_url TEXT NOT NULL,
  user_id BIGINT REFERENCES users(id) NOT NULL
);

-- INSERT INTO short_urls (original_url) VALUES ('www.testurl.com')
