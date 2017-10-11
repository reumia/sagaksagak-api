import express from 'express'

const router = express.Router()
require('./middlewares')(router)

/* GET ALL COMICS */
router.get('/', async (req, res) => {
    try {
        const Comics = req.db.models.comics

        console.log(`GET All Opened Comics.`)

        const comics = await Comics.allAsync({})

        res.status(200).json(comics)
    }
    catch(err) {
        res.status(500).json(err)
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
        res.status(500).json(err)
    }
})

/* ADD COMICS */
router.post('/', async (req, res) => {
    try {
        const Comics = req.db.models.comics
        const Users = req.db.models.users

        console.log(`ADD New Comic.`)

        const comic = await Comics.createAsync({
            status: 'CLOSED',
            title: req.body.title,
            descriptions: req.body.descriptions,
            image_url: req.body.imageUrl ? req.body.imageUrl : null
        })
        const user = await Users.getAsync(req.session.userId)
        await comic.setOwnerAsync(user)

        res.status(200).json(comic)
    }
    catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router