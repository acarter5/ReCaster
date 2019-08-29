DROP DATABASE IF EXISTS recaster_test;

CREATE DATABASE recaster_test;

USE recaster_test;

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


  INSERT INTO episodes
    ( title, series_id, src, shoutouts)
  VALUES
    ('Wikipedia', 1, "https://recaster.s3.us-east-2.amazonaws.com/how-i-built-this.mp3", '[]')

