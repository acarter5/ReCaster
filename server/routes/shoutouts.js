const shoutoutsController = require('../controllers/shoutoutsController')

const setupShoutoutsRoutes = router => {
    router.put('/wikipedia/:id', shoutoutsController.newShoutout)
}

module.exports = { setupShoutoutsRoutes }
