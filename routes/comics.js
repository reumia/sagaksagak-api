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
router.get('/:id', (req, res) => {
    const Comics = req.db.models.comics
    const comicId = req.params.id

    console.log(`GET Comic ${comicId}.`)

    Comics.get(comicId, (err, comic) => {
        if (err) res.status(500).json({err: err})
        res.status(200).json(comic)
    })
})

module.exports = router