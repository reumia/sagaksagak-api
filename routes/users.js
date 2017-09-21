import express from 'express'

const router = express.Router()
require('./middlewares')(router)

/* GET ALL USERS */
router.get('/', function(req, res) {
    console.log(req.db.models)
    res.send('Birds home page')
})

/* ADD USER */
router.get('/about', function(req, res) {
    res.send('About birds')
})

module.exports = router