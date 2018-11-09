const db = require('./config.js');

const episodeById = (episode_id, whenData) => {
  const qs = `SELECT * FROM episodes WHERE id = ${episode_id}`;

  db.query(qs, whenData);
}

const addShoutOut = (episode_id, shoutOuts, whenUpdated) => {
  const qs = `UPDATE episodes SET shoutouts = ` + `${JSON.stringify(shoutOuts)}` + ` WHERE id = ${episode_id};`;
  console.log('qs', qs);
  db.query(qs, whenUpdated);  
}

module.exports = { episodeById, addShoutOut };