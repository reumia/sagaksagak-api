import express from 'express'
import bcrypt from 'bcrypt'

const router = express.Router()
require('./middlewares')(router)

/**
 * SIGN UP
 */
router.post('/sign-up', async(req, res) => {
    try {
        console.log('Sign Up', req.body.email)

        console.log('Hashing password...')
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(req.body.password, salt)

        const Users = req.db.models.users
        const result = await Users.createAsync({
            status: 'OPENED',
            email: req.body.email,
            password: hashedPassword,
            name: req.body.name,
            descriptions: req.body.descriptions
        })

        res.status(200).json(result)
    }
    catch(err) {
        console.warn(err)
        res.status(500).json(err.message)
    }
})

/**
 * SIGN IN
 */
router.post('/sign-in', async(req, res) => {
    try {
        const Users = req.db.models.users
        const email = req.body.email
        console.log('Sign In', email)

        if (req.session.email) throw new Error('ALREADY_AUTHORIZED')
        const user = await Users.oneAsync({email: email})
        if (user === null) throw new Error('NO_USER')
        if (bcrypt.compareSync(req.body.password, user.password) === false) throw new Error('WRONG_PASSWORD')

        req.session.email = email
        req.session.userId = user.id

        user.password = null

        res.status(200).json(user)
    }
    catch(err) {
        console.warn(err)
        res.status(500).json(err.message)
    }
})

/**
 * SIGN OUT
 */
router.post('/sign-out', async(req, res) => {
    try {
        console.log('Sign Out')

        if (req.session.email) req.session.destroy((err) => {
            if (err) throw new Error('SIGN_OUT_FAILURE')
            else res.status(200).send()
        })
        else throw new Error('NOT_AUTHORIZED')

        res.status(200).send()
    }
    catch(err) {
        console.warn(err)
        res.status(500).json(err.message)
    }
})

module.exports = router