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
    test.only('it should respond with 200 status code', () => {
        console.log('env', process.env.NODE_ENV)
        expect(response.status).toBe(200)
    })

    test.skip('it should respond with html', () => {
        expect(response.data).toMatch('<html>')
    })
})
