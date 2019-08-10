const express = require('express')
const { setupEpisodesRoutes } = require('./episodes.js')

const setupRoutes = app => {
    const episodesRouter = express.Router()
    setupEpisodesRoutes(episodesRouter)
    app.use('/episodes', episodesRouter)
}

module.exports = { setupRoutes }
