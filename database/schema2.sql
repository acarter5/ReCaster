DROP DATABASE IF EXISTS recaster;

CREATE DATABASE recaster;

USE recaster;

CREATE TABLE episodes
(
  id int NOT NULL
  AUTO_INCREMENT,
  title text,
  series_id int,
  src text,
  shoutouts text,
  PRIMARY KEY
  (id)
);

  ALTER DATABASE recaster CHARACTER
  SET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

  ALTER TABLE episodes CONVERT TO CHARACTER
  SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

  ALTER TABLE episodes CHANGE shoutouts shoutouts TEXT CHARACTER
  SET utf8mb4
  COLLATE utf8mb4_unicode_ci;



  INSERT INTO episodes
    ( title, series_id, src, shoutouts)
  VALUES
    ('Wikipedia', 1, "https://recaster.s3.us-east-2.amazonaws.com/how-i-built-this.mp3", '[]')

