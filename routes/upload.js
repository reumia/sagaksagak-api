import express from 'express'
import multer from 'multer'
import fs from 'fs'

const router = express.Router()
const upload = multer({ dest: 'attachments/' })
const TYPE_COMIC = upload.single('file')

router.use(TYPE_COMIC)
require('./middlewares')(router)

/**
 * File Upload
 */
router.post('/', function(req, res) {
    try {
        console.log('File Upload')

        res.status(200).json({
            imageUrl: `http://127.0.0.1:3001/static/${req.file.filename}`
        })
    }
    catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router