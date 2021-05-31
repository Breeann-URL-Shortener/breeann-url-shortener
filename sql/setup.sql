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

-- INSERT INTO short_urls (id, original_url, user_id) VALUES ('ttt', 'www.testurl.com', 1);
-- INSERT INTO users (email, password_hash) VALUES ('test@test.com', 'password');
