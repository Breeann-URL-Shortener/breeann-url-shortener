DROP TABLE IF EXISTS short_urls;

CREATE TABLE short_urls (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  original_url TEXT NOT NULL
);

INSERT INTO short_urls (original_url) VALUES ('www.testurl.com')
