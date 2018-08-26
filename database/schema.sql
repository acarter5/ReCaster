DROP DATABASE IF EXISTS review_db;

CREATE DATABASE recaster;

USE recaster;

CREATE TABLE episodes (
  id int NOT NULL AUTO_INCREMENT,
  title text,
  series_id int,
  title text,
  src text,
  shoutOuts text,
  PRIMARY KEY (id)
);

