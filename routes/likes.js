import express from 'express'

const router = express.Router()
require('./middlewares')(router)

/* LIKE USER */
router.post('/user/:id', async (req, res) => {
    try {
        console.log(`LIKE ${req.body.id}`)

        // TODO : 중복 좋아요 validation
        const LikesUser = req.db.models.likes_user
        const like = await LikesUser.createAsync({
            targetId: req.params.id,
            userId: req.session.userId
        })

        res.status(200).json(like)
    }
    catch(err) {
        let errorCode = null
        if (err.message === 'required') errorCode = `REQUIRED_${err.property.toUpperCase()}`
        else errorCode = err.literalCode

        console.log(err)
        res.status(500).json(errorCode)
    }
})

/* UNLIKE USER */
router.delete('/user/:id', async (req, res) => {
    try {
        console.log(`LIKE ${req.body.id}`)

        const LikesUser = req.db.models.likes_user
        const like = await LikesUser.findAsync({ targetId: req.body.id })

        await like.removeAsync()

        res.status(200).send()
    }
    catch(err) {
        console.log(err.literalCode)
        res.status(500).json(err.literalCode)
    }
})

module.exports = router