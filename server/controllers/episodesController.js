const db = require('../../database/operations')

const episodeById = (req, res) => {
    db.episodeById(req.params.id, (err, results) => {
        try {
            res.status(200).send(results)
        } catch (err) {
            res.staus(404).send(err)
        }
    })
}

module.exports = { episodeById }
