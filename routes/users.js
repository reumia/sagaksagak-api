import express from 'express'

const router = express.Router()
require('./middlewares')(router)

/* GET ALL USERS */
router.get('/', (req, res) => {
    const Users = req.db.models.users

    console.log(`GET All Opened Users.`)

    Users.all({status: 'OPENED'}, (err, users) => {
        if (err) res.status(500).json({err: err})
        res.status(200).json(users)
    })
})

/* GET USER BY ID */
router.get('/:id', (req, res) => {
    const Users = req.db.models.users
    const userId = req.params.id

    console.log(`GET User ${userId}.`)

    Users.get(userId, (err, user) => {
        if (err) res.status(500).json({err: err})
        res.status(200).json(user)
    })
})

/* ADD USER */
/* UPDATE USER */
/* DROP USER */

module.exports = router