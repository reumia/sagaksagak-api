module.exports = (db, cb) => {
    db.define('likes_user', {
        user_id: {type: 'integer'},
        target_user_id: {type: 'integer'}
    })

    cb()
}