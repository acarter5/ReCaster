const startServer = require('../start')
const axios = require('axios')

describe('Get /', () => {
    let server, baseURL, staticRoute, response
    const episodeId = '1'
    beforeAll(async () => {
        server = await startServer({ port: 8798 })
        baseURL = `http://localhost:${server.address().port}`
        staticRoute = axios.create({ baseURL })
        response = await staticRoute.get(episodeId)
    })

    afterAll(() => server.close())
    test('it should respond with 200 status code', done => {
        expect(response.status).toBe(200)
        done()
    })

    test('it should respond with html', done => {
        expect(response.data).toMatch('<html>')
        done()
    })
})
