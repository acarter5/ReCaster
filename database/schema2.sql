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
    ('Wikipedia', 1, "https:
//play.podtrac.com/npr-510313/ondemand.npr.org/anon.npr-podcasts/podcast/npr/hibt/2018/02/20180223_hibt_wikipedia-c2d9f4e7-ccd9-40d0-b07f-e6e4a87e1657.mp3?orgId=1&d=2628&p=510313&story=588068536&t=podcast&e=588068536&siteplayer=true23.4
.1", '[]')

