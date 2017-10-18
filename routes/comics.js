import express from 'express'

const router = express.Router()
require('./middlewares')(router)

/**
 * GET LATEST COMICS
 */
router.get('/latest', async (req, res) => {
    try {
        console.log(`GET Latest 8 Comics.`)

        const Comics = req.db.models.comics
        const comics = await Comics.findAsync({status: ['READY', 'OPENED', 'CLOSED']}, {limit: 8}, ['createdAt', 'Z'])

        res.status(200).json(comics)
    }
    catch(err) {
        console.log(err.literalCode)
        res.status(500).json(err.literalCode)
    }
})

/**
 * GET POPULAR COMICS
 * TODO : 인기 코믹
 */
router.get('/popular', async (req, res) => {
    try {
        console.log(`GET Popular 8 Comics.`)

        const Comics = req.db.models.comics
        const comics = await Comics.findAsync({status: ['READY', 'OPENED', 'CLOSED']}, {limit: 8}, ['createdAt', 'Z'])

        res.status(200).json(comics)
    }
    catch(err) {
        console.log(err.literalCode)
        res.status(500).json(err.literalCode)
    }
})

/**
 * GET COMIC BY ID
 */
router.get('/:id', async (req, res) => {
    try {
        console.log(`GET Comic ${req.params.id}.`)

        const Comics = req.db.models.comics
        const comic = await Comics.getAsync(req.params.id)
        const tree = {} // TODO : TREE

        res.status(200).json({
            ...comic,
            tree: tree
        })
    }
    catch(err) {
        console.warn(err.literalCode)
        res.status(500).json(err.literalCode)
    }
})

/**
 * ADD COMICS
 */
router.post('/', async (req, res) => {
    try {
        console.log(`ADD New Comic.`)

        const Comics = req.db.models.comics
        const comic = await Comics.createAsync({
            status: 'READY',
            title: req.body.title,
            descriptions: req.body.descriptions,
            imageUrl: req.body.imageUrl ? req.body.imageUrl : null,
            ownerId: req.session.userId
        })

        res.status(200).json(comic)
    }
    catch(err) {
        let errorCode = null
        if (err.message === 'required') errorCode = `REQUIRED_${err.property.toUpperCase()}`
        else errorCode = err.literalCode

        console.log(err)
        res.status(500).json(errorCode)
    }
})

/**
 * UPDATE COMICS
 */
router.put('/:id/update', async (req, res) => {
    try {
        console.log(`Update Comic ${req.params.id}.`)

        const Comics = req.db.models.comics
        const comic = await Comics.getAsync(req.params.id)

        await comic.saveAsync({
            title: req.body.title,
            descriptions: req.body.descriptions,
            imageUrl: req.body.imageUrl
        })

        res.status(200).json(comic)
    }
    catch(err) {
        let errorCode = null
        if (err.message === 'required') errorCode = `REQUIRED_${err.property.toUpperCase()}`
        else errorCode = err.literalCode

        console.log(err)
        res.status(500).json(errorCode)
    }
})

module.exports = router