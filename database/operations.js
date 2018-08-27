const db = require('./config.js');

const episodeById = (episode_id, whenData) => {
  const qs = `SELECT * FROM episodes WHERE id = ${episode_id}`;

  db.query(qs, whenData);
}

module.exports = { episodeById };