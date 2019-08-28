const express = require('express')
const { setupEpisodesRoutes } = require('./episodes.js')
const { setupShoutoutsRoutes } = require('./shoutouts.js')

const setupRoutes = app => {
    const episodesRouter = express.Router()
    setupEpisodesRoutes(episodesRouter)
    app.use('/api/episodes', episodesRouter)

    const shoutoutsRouter = express.Router()
    setupShoutoutsRoutes(shoutoutsRouter)
    app.use('/api/shoutouts', shoutoutsRouter)
}

module.exports = { setupRoutes }
