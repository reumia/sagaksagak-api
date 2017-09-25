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

/* GET USER BY ID */
router.get('/:id', async(req, res) => {
    try {
        const Users = req.db.models.users
        const userId = req.params.id

        console.log(`GET User ${userId}.`)

        let result = {}
        const user = await Users.getAsync(userId)
        const userComics = await user.getComicsAsync()

        result.status = user.status
        result.name = user.name
        result.descriptions = user.descriptions
        result.email = user.email
        result.site = user.site
        // TODO : 유저가 소유하는 컷의 갯수
        result.cuts = 10000
        // TODO : 유저를 좋아하는 유저의 갯수
        result.likes = 302395
        // TODO : 유저 배경 이미지
        result.profile_image_url = '/static/example/user_profile.jpg'
        // TODO : 유저 프로필 이미지
        result.featured_image_url = '/static/example/user_featured.jpg'
        result.created_at = user.created_at
        result.comics = userComics

        res.status(200).json(result)
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

/* SIGN UP */
router.post('/sign-up', async(req, res) => {
    try {
        console.log('Sign Up', req.body.email)

        const Users = req.db.models.users
        const record = {
            status: 'OPENED',
            email: req.body.email,
            password: req.body.password
        }
        const result = await Users.createAsync(record)

        res.status(200).json(result)
    }
    catch(err) {
        console.warn(err.message)
        res.status(500).json(err.message)
    }
})

/* SIGN IN */
router.post('/sign-in', async(req, res) => {
    try {
        const email = req.body.email

        console.log('Sign In', email)

        const Users = req.db.models.users
        const user = await Users.oneAsync({email: email})

        if (user === null) throw new Error('없는 회원입니다.')
        if (bcrypt.compareSync(req.body.password, user.password) === false) throw new Error('잘못된 비밀번호입니다.')

        req.session.email = email

        res.status(200).json(user)
    }
    catch(err) {
        console.warn(err.message)
        res.status(500).json(err.message)
    }
})

/* SIGN OUT */
router.delete('/sign-out', async(req, res) => {
    try {
        console.log('Sign Out')

        res.status(200)
    }
    catch(err) {
        console.warn(err.message)
        res.status(500).json(err.message)
    }
})

module.exports = router