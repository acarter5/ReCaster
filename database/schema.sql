DROP DATABASE IF EXISTS recaster;

CREATE DATABASE recaster;

USE recaster;

CREATE TABLE episodes (
  id int NOT NULL AUTO_INCREMENT,
  title text,
  series_id int,
  src text,
  shoutouts text,
  PRIMARY KEY (id)
);


INSERT INTO episodes ( title, series_id, src, shoutouts) VALUES ('Wikipedia', 1, "https://play.podtrac.com/npr-510313/npr.mc.tritondigital.com/NPR_510313/media/anon.npr-podcasts/podcast/npr/hibt/2018/02/20180223_hibt_wikipedia-c2d9f4e7-ccd9-40d0-b07f-e6e4a87e1657.mp3", '[]')

