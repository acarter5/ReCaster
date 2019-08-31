const startServer = require('../start')
const axios = require('axios')
const { createPool } = require('../../database/config')
const initDb = require('../test-utils/initDB')

describe('Get /', () => {
    let server, baseURL, staticRoute, response, dbPool
    const episodeId = '1'
    beforeAll(async () => {
        dbPool = await createPool()
        await initDb()

        server = await startServer({ port: 8798 })
        baseURL = `http://localhost:${server.address().port}`
        staticRoute = axios.create({ baseURL })
        response = await staticRoute.get(episodeId)
    })

    beforeEach(() => {
        jest.useFakeTimers()
    })

    afterAll(async () => {
        await server.close()
        await dbPool.end()
    })

    test('it should respond with 200 status code', () => {
        expect(response.status).toBe(200)
    })

    test('it should respond with html', () => {
        expect(response.data).toMatch('<html>')
    })
})
