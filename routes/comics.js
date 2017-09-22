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

        let result
        const comic = await Comics.getAsync(comicId)
        const comicOwner = await comic.getOwnerAsync()

        result = comic
        result.owner = comicOwner
        // TODO : 코믹이 소유하는 컷의 갯수
        result.cuts = 100
        // TODO : 코믹을 좋아하는 유저의 갯수
        result.likes = 302395
        // TODO : 코믹 배경 이미지
        result.image_url = '/static/example/featured.jpg'
        // TODO : TREE

        res.status(200).json(result)
    }
    catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router