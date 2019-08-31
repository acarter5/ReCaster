const { getConnection, dbPool } = require('./config.js')

const episodeById = async (episode_id, whenData) => {
    const qs = `SELECT * FROM episodes WHERE id = ${episode_id}`
    let connection, results

    try {
        connection = await getConnection()
    } catch (err) {
        whenData(err, null)
        return
    }

    try {
        results = await connection.query(qs)
    } catch (err) {
        whenData(err, null)
        return
    }

    connection.release()

    whenData(null, results)
}

const addShoutOut = async (episode_id, shoutOuts, whenUpdated) => {
    const qs =
        `UPDATE episodes SET shoutouts = ` +
        `${JSON.stringify(shoutOuts)}` +
        ` WHERE id = ${episode_id};`

    let connection, results

    try {
        connection = await getConnection()
    } catch (err) {
        whenData(err, null)
        return
    }

    try {
        results = await connection.query(qs)
    } catch (err) {
        whenData(err, null)
        return
    }

    connection.release()

    whenUpdated(null, results)
}

module.exports = { episodeById, addShoutOut }
