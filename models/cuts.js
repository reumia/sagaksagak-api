module.exports = (db, cb) => {
    db.define('cuts', {
        user_id: {type: 'integer'},
        comic_id: {type: 'integer'},
        parent_id: {type: 'integer'},
        title: {type: 'text'},
        descriptions: {type: 'text'},
        image_url: {type: 'text'},
        created_at: {type: 'date'}
    })

    cb()
}