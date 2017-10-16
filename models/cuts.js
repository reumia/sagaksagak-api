module.exports = (db, cb) => {
    db.define('cuts', {
        status: {type: 'enum', values: ['OPENED', 'CLOSED', 'BLOCKED']},
        parentId: {type: 'integer', mapsTo: 'parent_id'},
        title: {type: 'text'},
        descriptions: {type: 'text'},
        imageUrl: {type: 'text', mapsTo: 'image_url'},
        createdAt: {type: 'date', time: true, mapsTo: 'created_at'}
    }, {
        hooks: {
            beforeCreate: function () {
                this.createdAt = new Date()
            }
        }
    })

    cb()
}