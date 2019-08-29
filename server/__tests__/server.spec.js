const startServer = require('../start')
const axios = require('axios')
const dbutils = require('../../database/config')
const { createPool } = dbutils
const initDb = require('../test-utils/initDB')

describe('Get /', () => {
    let server, baseURL, staticRoute, response, dbPool
    const episodeId = '1'
    beforeAll(async () => {
        dbPool = createPool()
        initDb()

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