const startServer = require('../../start')
const axios = require('axios')
const getData = res => res.data
const { createPool } = require('../../../database/config')
const initDb = require('../../test-utils/initDB')

describe('Get /episodes', () => {
    let server, baseURL, api
    const episodeId = '1'
    beforeAll(async () => {
        dbPool = createPool()
        initDb()
        server = await startServer({ port: 8798 })
        baseURL = `http://localhost:${server.address().port}/api`
        api = axios.create({ baseURL })
    })

    afterAll(done => {
        dbPool.end(done)
        server.close(done)
    })

    test('it should respond with 200 status code', async () => {
        const response = await api.get(`episodes/${episodeId}`)
        expect(response.status).toBe(200)
    })

    test('it should respond with correct data', async () => {
        const dataArr = await api.get(`episodes/${episodeId}`).then(getData)
        console.log('dataArr', dataArr)
        const data = dataArr.pop()

        expect(data).toEqual({
            id: 1,
            series_id: 1,
            shoutouts: '[]',
            src:
                'https://play.podtrac.com/npr-510313/ondemand.npr.org/anon.npr-podcasts/podcast/npr/hibt/2018/02/20180223_hibt_wikipedia-c2d9f4e7-ccd9-40d0-b07f-e6e4a87e1657.mp3?orgId=1&d=2628&p=510313&story=588068536&t=podcast&e=588068536&siteplayer=true23.4.1',
            title: 'Wikipedia'
        })

        expect(Array.isArray(JSON.parse(data.shoutouts))).toBeTruthy()
    })
})
