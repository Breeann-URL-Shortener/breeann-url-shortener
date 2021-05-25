DROP TABLE IF EXISTS short_urls;

CREATE TABLE short_urls (
  id TEXT PRIMARY KEY,
  original_url TEXT NOT NULL
);
