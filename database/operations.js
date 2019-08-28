const getConnection = require('./config.js')

const episodeById = (episode_id, whenData) => {
    const qs = `SELECT * FROM episodes WHERE id = ${episode_id}`
    getConnection((err, connection) => {
        connection.on('error', err => {
            whenData(err, null)
        })
        connection.query(qs, whenData)
        connection.release()
    })
}

const addShoutOut = (episode_id, shoutOuts, whenUpdated) => {
    const qs =
        `UPDATE episodes SET shoutouts = ` +
        `${JSON.stringify(shoutOuts)}` +
        ` WHERE id = ${episode_id};`

    getConnection((err, connection) => {
        connection.on('error', err => {
            whenUpdated(err, null)
        })
        connection.query(qs, whenUpdated)
        connection.release()
    })
}

module.exports = { episodeById, addShoutOut }
