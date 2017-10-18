import express from 'express'

const router = express.Router()
require('./middlewares')(router)

/**
 * GET ALL USERS
 */
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

/**
 * GET USER BY SESSION
 */
router.get('/@me', async(req, res) => {
    try {
        console.log(`GET Current User.`)

        const Users = req.db.models.users
        const user = await Users.oneAsync({ email: req.session.email })
        if (user === null) throw new Error('NOT_AUTHORIZED')

        res.status(200).json(user)
    } catch(err) {
        if (err.message === 'NOT_AUTHORIZED') res.status(401).send()
        else {
            console.warn(err.literalCode)
            res.status(500).json(err.literalCode)
        }
    }
})

/**
 * GET USER BY ID
 */
router.get('/:id', async(req, res) => {
    try {
        console.log(`GET User ${req.params.id}.`)

        const Users = req.db.models.users
        const user = await Users.getAsync(req.params.id)
        if (user === null) throw new Error('NO_USER')

        res.status(200).json(user)
    }
    catch(err) {
        console.warn(err.literalCode)
        res.status(500).json(err.literalCode)
    }
})

/**
 * UPDATE USER
 */
router.put('/:id/update', async(req, res) => {
    try {
        console.log(`Update User ${req.params.id}.`)

        const Users = req.db.models.users
        const user = await Users.getAsync(req.params.id)
        if (user === null) throw new Error('NO_USER')

        await user.saveAsync({
            name: req.body.name,
            descriptions: req.body.descriptions,
            site: req.body.site,
            imageUrl: req.body.imageUrl
        })

        res.status(200).json(user)
    }
    catch(err) {
        console.log(err)
        res.status(500).json(errorCode)
    }
})

/* GET USER LIKES */
// 유저가 좋아하는 유저
// 유저가 좋아하는 코믹
// 유저가 좋아하는 컷

/* DROP USER */

module.exports = router