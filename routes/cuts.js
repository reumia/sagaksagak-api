import express from 'express'
import _ from 'lodash'

const router = express.Router()
require('./middlewares')(router)

/**
 * ADD CUT
 */
router.post('/', async (req, res) => {
    try {
        const comicId = req.body.comicId
        const parentId = req.body.parentId
        const Cuts = req.db.models.cuts

        console.log(`Comic ${comicId}' & 'Cut ${parentId} - ADD Cut`)

        const isInitial = parentId === null
        const hasInitialCut = await Cuts.existsAsync({comic_id: comicId, parent_id: null})
        if (isInitial && hasInitialCut) throw new Error('INITIAL_CUT_ALREADY_EXISTS')

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
        else errorCode = err.message

        console.log(err)
        res.status(500).json(errorCode)
    }
})

/**
 * GET CUT BY ID
 */
router.get('/:id', async (req, res) => {
    try {
        const cutId = req.params.id
        const Cuts = req.db.models.cuts

        console.log(`Cut ${cutId} : Get Parent Cut`)

        const cut = await Cuts.getAsync(cutId)

        res.status(200).json(cut)
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err.message)
    }
})

/**
 * GET SIBLING CUTS BY ID
 */
router.get('/:id/siblings', async (req, res) => {
    try {
        const cutId = req.params.id
        const Cuts = req.db.models.cuts

        console.log(`Cut ${cutId} : Get Siblings`)

        const cut = await Cuts.getAsync(cutId)
        const siblingCuts = await Cuts.findAsync({ parentId: cut.parentId })

        res.status(200).json(siblingCuts)
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err.message)
    }
})

/**
 * GET PARENT CUT BY ID
 */
router.get('/:id/parent', async (req, res) => {
    try {
        const cutId = req.params.id
        const Cuts = req.db.models.cuts

        console.log(`Cut ${cutId} : Get Parent Cut`)

        const cut = await Cuts.getAsync(cutId)
        const parentCut = await cut.getParentAsync()

        res.status(200).json(parentCut)
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err.message)
    }
})

/**
 * GET CHILDREN CUTS BY ID
 */
router.get('/:id/children', (req, res) => {
    try {
        const cutId = req.params.id
        const Cuts = req.db.models.cuts

        console.log(`Cut ${cutId} : Get Children Cuts`)

        Cuts.find({parentId: cutId})
            .each()
            .sort((before, after) => {
                return before.likes < after.likes
            })
            .get(cuts => {
                res.status(200).json(cuts[0])
            })
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err.message)
    }
})

module.exports = router