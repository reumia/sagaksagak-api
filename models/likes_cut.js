module.exports = (db, cb) => {
    db.define('likes_cut', {
        user_id: {type: 'integer'},
        cut_id: {type: 'integer'}
    })

    cb()
}