module.exports = (db, cb) => {
    db.define('likes_comic', {
        user_id: {type: 'integer'},
        comic_id: {type: 'integer'}
    })

    cb()
}