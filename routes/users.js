import express from 'express'
import bcrypt from 'bcrypt'

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

        res.status(200).json({
            id: user.id,
            status: user.status,
            name: user.name,
            email: user.email,
            descriptions: user.descriptions,
            site: user.site,
            profile_image_url: user.profile_image_url,
            featured_image_url: user.featured_image_url
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

/* GET USER BY ID */
router.get('/:id', async(req, res) => {
    try {
        const Users = req.db.models.users
        const userId = req.params.id

        console.log(`GET User ${userId}.`)

        const user = await Users.getAsync(userId)
        const userComics = await user.getComicsAsync()

        res.status(200).json({
            id: user.id,
            status: user.status,
            name: user.name,
            descriptions: user.descriptions,
            email: user.email,
            site: user.site,
            cuts: 10000, // TODO : 유저가 소유하는 컷의 갯수
            likes: 302395, // TODO : 유저를 좋아하는 유저의 갯수
            profile_image_url: user.profile_image_url, // TODO : 유저 배경 이미지
            featured_image_url: user.featured_image_url, // TODO : 유저 프로필 이미지
            comics: userComics,
            created_at: user.created_at
        })
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