import express from 'express'

const router = express.Router()
require('./middlewares')(router)

/* GET LATEST COMICS */
router.get('/', async (req, res) => {
    try {
        const Comics = req.db.models.comics

        console.log(`GET Latest 8 Comics.`)

        const comics = await Comics.findAsync({}, {limit: 8}, ['created_at', 'Z'])

        res.status(200).json(comics)
    }
    catch(err) {
        console.log(err.literalCode)
        res.status(500).json(err.literalCode)
    }
})

/* GET COMIC BY ID */
router.get('/:id', async (req, res) => {
    try {
        const Comics = req.db.models.comics
        const comicId = req.params.id

        console.log(`GET Comic ${comicId}.`)

        const comic = await Comics.getAsync(comicId)
        // TODO : TREE
        const tree = {}

        res.status(200).json({
            ...comic,
            tree: tree
        })
    }
    catch(err) {
        console.log(err)
        res.status(500).json(err.message)
    }
})

/* ADD COMICS */
router.post('/', async (req, res) => {
    try {
        const Comics = req.db.models.comics
        const Users = req.db.models.users

        console.log(`ADD New Comic.`)

        const comic = await Comics.createAsync({
            status: 'READY',
            title: req.body.title,
            descriptions: req.body.descriptions,
            image_url: req.body.imageUrl ? req.body.imageUrl : null
        })
        const user = await Users.getAsync(req.session.userId)
        await comic.setOwnerAsync(user)

        res.status(200).json(comic)
    }
    catch(err) {
        console.log(err)

        let errorCode = null

        if (err.message === 'required') errorCode = `REQUIRED_${err.property.toUpperCase()}`
        else errorCode = err.literalCode

        res.status(500).json(errorCode)
    }
})

module.exports = router