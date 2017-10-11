import express from 'express'

const router = express.Router()
require('./middlewares')(router)

// Dummy Upload API
router.post('/', function(req, res) {
    try {
        res.status(200).json({
            downloadUrl: null
        })
    }
    catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router