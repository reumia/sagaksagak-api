module.exports = (db, cb) => {
    db.define('comics', {
        user_id: {type: 'integer'},
        status_id: {type: 'integer'},
        title: {type: 'text'},
        descriptions: {type: 'text'},
        image_url: {type: 'text'},
        created_at: {type: 'date'}
    })

    cb()
}