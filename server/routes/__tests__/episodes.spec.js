const startServer = require('../../start')
const axios = require('axios')
const getData = res => res.data
const dbutils = require('../../../database/config')
const { createPool } = dbutils
const initDb = require('../../test-utils/initDB')

describe('Get /episodes', () => {
    let server, baseURL, api, dbPool
    const episodeId = '1'
    beforeAll(async () => {
        dbPool = await createPool()
        await initDb()

        server = await startServer({ port: 8798 })
        baseURL = `http://localhost:${server.address().port}/api`
        api = axios.create({ baseURL })
    })

    beforeEach(() => {
        jest.useFakeTimers()
    })

    afterAll(async () => {
        await server.close()
        await dbPool.end()
    })

    test('it should respond with 200 status code', async () => {
        const response = await api.get(`episodes/${episodeId}`)
        expect(response.status).toBe(200)
    })

    test('it should respond with correct data', async () => {
        const dataArr = await api.get(`episodes/${episodeId}`).then(getData)
        const data = dataArr.pop()

        expect(data).toEqual({
            id: 1,
            series_id: 1,
            shoutouts: '[]',
            src:
                'https://recaster.s3.us-east-2.amazonaws.com/how-i-built-this.mp3',
            title: 'Wikipedia'
        })

        expect(Array.isArray(JSON.parse(data.shoutouts))).toBeTruthy()
    })
})
