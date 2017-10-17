import express from 'express'

const router = express.Router()
require('./middlewares')(router)

/* ADD LIKE USER */
router.post('/user/:id', async (req, res) => {
    try {
        const targetId = req.params.id
        const userId = req.session.userId
        const LikesUser = req.db.models.likes_user
        console.log(`LIKE USER ${targetId}`)

        // 로그인 여부 검사
        if (Boolean(userId) === false) throw new Error('NOT_AUTHORIZED')
        // 존재여부 검사
        const exists = await LikesUser.existsAsync({ user_id: userId })
        if (exists) throw new Error('ALREADY_EXISTS')
        // 생성
        const like = await LikesUser.createAsync({
            targetId: parseInt(targetId, 10),
            userId: parseInt(userId, 10) })

        res.status(200).json(like)
    }
    catch(err) {
        let errorCode = null
        if (err.message === 'required') errorCode = `REQUIRED_${err.property.toUpperCase()}`
        else errorCode = err.message

        console.log(err)
        res.status(500).json(errorCode)
    }
})

/* DELETE LIKE USER */
router.delete('/user/:id', async (req, res) => {
    try {
        const targetId = req.params.id
        const LikesUser = req.db.models.likes_user
        console.log(`LIKE ${targetId}`)

        const like = await LikesUser.oneAsync({ targetId: targetId })
        await like.removeAsync()

        res.status(200).json(like)
    }
    catch(err) {
        console.log(err)
        res.status(500).json(err.literalCode)
    }
})

module.exports = router