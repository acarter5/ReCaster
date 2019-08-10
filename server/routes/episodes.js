const episodesController = require('../controllers/episodesController')

const setupEpisodesRoutes = router => {
    router.get('/:id', episodesController.episodeById)
}

module.exports = { setupEpisodesRoutes }
