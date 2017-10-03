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

/* GET USER BY SESSION */
router.get('/@me', async(req, res) => {
    try {
        const Users = req.db.models.users

        console.log(`GET Current User.`)

        const user = await Users.oneAsync({ email: req.session.email })
        if (user === null) throw new Error('NOT_AUTHORIZED')

        user.password = null

        res.status(200).json(user)
    } catch(err) {
        if (err.message === 'NOT_AUTHORIZED') res.status(401).send()
        else res.status(500).json(err)
    }
})

/* GET USER BY ID */
router.get('/:id', async(req, res) => {
    try {
        const Users = req.db.models.users
        const userId = req.params.id

        console.log(`GET User ${userId}.`)

        const user = await Users.getAsync(userId)
        if (user === null) throw new Error('NO_USER')

        user.password = null

        res.status(200).json(user)
    }
    catch(err) {
        res.status(500).json(err)
    }
})

/* GET USER LIKES */
// 유저가 좋아하는 유저
// 유저가 좋아하는 코믹
// 유저가 좋아하는 컷


/* UPDATE USER */
/* DROP USER */

module.exports = router