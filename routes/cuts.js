import express from 'express'

const router = express.Router()
require('./middlewares')(router)

/* ADD CUT */
router.post('/', async (req, res) => {
    try {
        console.log(`ADD New Cut.`)

        const Cuts = req.db.models.cuts
        const cut = await Cuts.createAsync({
            status: 'OPENED',
            title: req.body.title,
            imageUrl: req.body.imageUrl,
            comicId: req.body.comicId,
            ownerId: req.session.userId,
            parentId: req.body.parentId ? req.body.parentId : null
        })

        res.status(200).json(await cut)
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