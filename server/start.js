const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const { setupRoutes } = require('./routes')

async function startServer({ port = process.env.SERVER_PORT } = {}) {
    port = port || 3000
    const app = express()
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(
        cors({
            origin: 'http://localhost:8080'
        })
    )

    setupRoutes(app)

    app.use('/:id', express.static(path.join(__dirname, '/../client/dist')))

    // app.get('/:id', (req, res) => {
    //     res.redirect(`http://localhost:${port}`)
    // })

    return new Promise(resolve => {
        const server = app.listen(port, () => {
            console.log(`server starting on port ${port}`)
            const originalClose = server.close.bind(server)
            server.close = () => {
                return new Promise(resolveClose => {
                    originalClose(resolveClose)
                })
            }
            resolve(server)
        })
    })
}

module.exports = startServer
