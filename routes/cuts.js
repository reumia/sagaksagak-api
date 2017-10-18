import express from 'express'

const router = express.Router()
require('./middlewares')(router)

/* ADD CUT */
router.post('/', async (req, res) => {
    try {
        const comicId = req.body.comicId
        const parentId = req.body.parentId ? req.body.parentId : null
        const Cuts = req.db.models.cuts

        console.log(`ADD Cut for 'Comic:${comicId}' & 'Cut:${parentId}'`)

        const hasInitialCut = await Cuts.existsAsync({parentId: null})
        if (hasInitialCut) throw new Error('INITIAL_CUT_ALREADY_EXISTS')

        const cut = await Cuts.createAsync({
            status: 'OPENED',
            title: req.body.title,
            imageUrl: req.body.imageUrl,
            comicId: comicId,
            ownerId: req.session.userId,
            parentId: parentId
        })

        res.status(200).json(cut)
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