import express from 'express'

const router = express.Router()
require('./middlewares')(router)

/* GET ALL USERS */
router.get('/', (req, res) => {
    console.log(`GET All Opened Users.`)

    const Users = req.db.models.users
    Users.all({status: 'OPENED'}, (err, users) => {
        if (err) {
            console.warn(err.literalCode)
            res.status(500).json(err.literalCode)
        }
        res.status(200).json(users)
    })
})

/* GET USER BY SESSION */
router.get('/@me', async(req, res) => {
    try {
        console.log(`GET Current User.`)

        const Users = req.db.models.users
        const user = await Users.oneAsync({ email: req.session.email })
        if (user === null) throw new Error('NOT_AUTHORIZED')

        user.password = null

        res.status(200).json(user)
    } catch(err) {
        if (err.message === 'NOT_AUTHORIZED') res.status(401).send()
        else {
            console.warn(err.literalCode)
            res.status(500).json(err.literalCode)
        }
    }
})

/* GET USER BY ID */
router.get('/:id', async(req, res) => {
    try {
        console.log(`GET User ${userId}.`)

        const Users = req.db.models.users
        const userId = req.params.id
        const user = await Users.getAsync(userId)
        if (user === null) throw new Error('NO_USER')

        user.password = null

        res.status(200).json(user)
    }
    catch(err) {
        console.warn(err.literalCode)
        res.status(500).json(err.literalCode)
    }
})

/* GET USER LIKES */
// 유저가 좋아하는 유저
// 유저가 좋아하는 코믹
// 유저가 좋아하는 컷


/* UPDATE USER */
/* DROP USER */

module.exports = router