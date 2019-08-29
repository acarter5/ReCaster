const startServer = require('../start')
const axios = require('axios')
const mysql = require('mysql')
// const dbutils = require('../../database/config')
// const { dbPool } = dbutils

describe('Get /', () => {
    let server, baseURL, staticRoute, response, dbPool, getConnection
    const episodeId = '1'
    const DATABASE =
        process.env.NODE_ENV === 'test' ? 'recaster_test' : 'recaster'
    beforeAll(async () => {
        dbPool = mysql.createPool({
            connectionLimit: 100,
            host: 'localhost',
            user: 'root',
            password: 'circle_test',
            database: DATABASE,
            multipleStatements: process.env.NODE_ENV === 'test'
        })

        getConnection = cb => {
            dbPool.getConnection((err, connection) => {
                cb(err, connection)
            })
        }

        const qs1 = `DROP DATABASE IF EXISTS recaster_test`
        const qs2 = 'CREATE DATABASE recaster_test'
        const qs3 = 'USE recaster_test'
        const qs4 = `CREATE TABLE episodes(id int NOT NULL AUTO_INCREMENT, title text, series_id int, src text, shoutouts text, PRIMARY KEY(id))`
        const qs5 = `INSERT INTO episodes ( title, series_id, src, shoutouts) VALUES ('Wikipedia', 1, "https://play.podtrac.com/npr-510313/ondemand.npr.org/anon.npr-podcasts/podcast/npr/hibt/2018/02/20180223_hibt_wikipedia-c2d9f4e7-ccd9-40d0-b07f-e6e4a87e1657.mp3?orgId=1&d=2628&p=510313&story=588068536&t=podcast&e=588068536&siteplayer=true23.4.1", '[]')`
        const qs6 =
            'ALTER DATABASE recaster_test CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci'
        const qs7 =
            'ALTER TABLE episodes CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci'
        const qs8 =
            'ALTER TABLE episodes CHANGE shoutouts shoutouts TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci'

        getConnection(async (err, connection) => {
            if (err) {
                throw err
            }
            await connection.query(
                `${qs1};${qs2};${qs3};${qs4};${qs5};${qs6};${qs7};${qs8};`,
                (err, results) => {
                    if (err) {
                        throw err
                    }
                }
            )

            connection.release()
        })

        server = await startServer({ port: 8798 })
        baseURL = `http://localhost:${server.address().port}`
        staticRoute = axios.create({ baseURL })
        response = await staticRoute.get(episodeId)
    })

    afterAll(async done => {
        dbPool.end(done)
        server.close(done)
    })
    test('it should respond with 200 status code', () => {
        expect(response.status).toBe(200)
    })

    test('it should respond with html', () => {
        expect(response.data).toMatch('<html>')
    })
})
