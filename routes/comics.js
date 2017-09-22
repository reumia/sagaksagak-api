import express from 'express'

const router = express.Router()
require('./middlewares')(router)

/* GET ALL COMICS */
router.get('/', (req, res) => {
    const Comics = req.db.models.comics

    console.log(`GET All Opened Comics.`)

    Comics.all({}, (err, comics) => {
        if (err) res.status(500).json({err: err})
        res.status(200).json(comics)
    })
})

/* GET USER BY ID */
router.get('/:id', async (req, res) => {
    try {
        const Comics = req.db.models.comics
        const comicId = req.params.id

        console.log(`GET Comic ${comicId}.`)

        let result;
        const comic = await Comics.getAsync(comicId)
        const comicOwner = await comic.getOwnerAsync()

        result = comic
        result.owner = comicOwner

        res.status(200).json(result)
    }
    catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router