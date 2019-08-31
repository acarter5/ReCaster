const startServer = require('../../start')
const axios = require('axios')
const getData = res => res.data
const { createPool } = require('../../../database/config')
const initDb = require('../../test-utils/initDB')

describe('Post /shoutouts', () => {
    let server, baseURL, api, dbPool, response
    const episodeId = '1'
    beforeAll(async () => {
        dbPool = await createPool()
        await initDb()

        server = await startServer({ port: 8798 })
        baseURL = `http://localhost:${server.address().port}/api`
        api = axios.create({ baseURL })
    })

    afterAll(done => {
        dbPool.end(done)
        server.close(done)
    })

    test('it should respond with 200 status code', async () => {
        try {
            response = await api.put(`shoutouts/wikipedia/${episodeId}`, {
                shoutoutTime: 1126,
                src: 'https://en.wikipedia.org/wiki/Africa',
                title: 'Africa'
            })
        } catch (err) {
            console.log('error', err)
        }
        expect(response.status).toBe(200)
    })

    test('it should insert the new shoutout into database', async () => {
        const dataArr = await api.get(`episodes/${episodeId}`).then(getData)
        const data = dataArr.pop()
        const shoutouts = data.shoutouts
        expect(shoutouts).toEqual(
            '[{"timespot":1126,"img":"https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Africa_%28orthographic_projection%29.svg/100px-Africa_%28orthographic_projection%29.svg.png","link":"https://en.wikipedia.org/wiki/Africa","short":"Africa is the world\'s second largest and second most-populous continent, being behind Asia in both categories. At about 30.3 million km2 (11.7 million square miles) including adjacent islands, it covers 6% of Earth\'s total surface area and 20% of its land area. With 1.2 billion people as of 2016, it accounts for about 16% of the world\'s human population.","title":"Africa"}]'
        )
    })

    test('it should error out if a shoutout it submitted at an existing shoutout-time', async () => {
        try {
            await api.put(`shoutouts/wikipedia/${episodeId}`, {
                shoutoutTime: 1126,
                src: 'https://en.wikipedia.org/wiki/Africa',
                title: 'Africa'
            })
        } catch (err) {
            expect(err.response.status).toBe(409)
            expect(err.response.data).toMatch(
                'given timespot already allocated'
            )
        }
    })
})
