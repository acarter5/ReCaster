const request = require('supertest')
const app = require('../app')

describe('Get /', () => {
    // const response = await request(app).get('/')
    // expect(response.statusCode).toBe(200)
    test('it should respond with the app', async () => {
        const response = await request(app).get('/1')
        expect(response.statusCode).toBe(200)
    })
})
