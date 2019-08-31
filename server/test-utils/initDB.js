const { getConnection } = require('../../database/config')

const initDB = async () => {
    const qs1 = `DROP DATABASE IF EXISTS recaster_test`
    const qs2 = 'CREATE DATABASE recaster_test'
    const qs3 = 'USE recaster_test'
    const qs4 = `CREATE TABLE episodes(id int NOT NULL AUTO_INCREMENT, title text, series_id int, src text, shoutouts text, PRIMARY KEY(id))`
    const qs5 = `INSERT INTO episodes ( title, series_id, src, shoutouts) VALUES ('Wikipedia', 1, "https://recaster.s3.us-east-2.amazonaws.com/how-i-built-this.mp3", '[]')`
    const qs6 =
        'ALTER DATABASE recaster_test CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci'
    const qs7 =
        'ALTER TABLE episodes CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci'
    const qs8 =
        'ALTER TABLE episodes CHANGE shoutouts shoutouts TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci'

    const connection = await getConnection()
    const results = await connection.query(
        `${qs1};${qs2};${qs3};${qs4};${qs5};${qs6};${qs7};${qs8};`
    )

    connection.release()

    results

    // const results = await new Promise((resolve, reject) => {
    //     connection.query(
    //         `${qs1};${qs2};${qs3};${qs4};${qs5};${qs6};${qs7};${qs8};`,
    //         (err, results) => {
    //             if (err) {
    //                 reject(err)
    //             }
    //             resolve(results)
    //         }
    //     )
    // })

    // console.log(results)

    // connection.release()

    // dbPool.getConnection(async (err, connection) => {
    //     if (err) {
    //         console.log(err)
    //     }

    //     console.log(
    //         'query',
    //         connection.query(
    //             `${qs1};${qs2};${qs3};${qs4};${qs5};${qs6};${qs7};${qs8};`,
    //             (err, results) => {
    //                 connection.release()
    //                 if (err) {
    //                     throw err
    //                 }
    //             }
    //         )
    //     )
    // })
}

module.exports = initDB
