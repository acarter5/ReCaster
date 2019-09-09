const { getConnection, dbPool } = require('./config.js')

const episodeById = async (episode_id, whenData) => {
    console.log('in db operations')
    const qs = `SELECT * FROM episodes WHERE id = ${episode_id}`
    let connection, results

    try {
        connection = await getConnection()
        console.log('db operations connetion', connection)
    } catch (err) {
        console.log('connection err', err)
        whenData(err, null)
        return
    }

    try {
        results = await connection.query(qs)
        console.log('db operations results', results)
    } catch (err) {
        console.log('query err', err)
        whenData(err, null)
        return
    }

    connection.release()
    console.log('results', results)

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
