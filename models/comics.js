module.exports = (db, cb) => {
    db.define('comics', {
        status: {type: 'enum', values: ['READY', 'OPENED', 'CLOSED', 'LOCKED', 'BLOCKED']},
        title: {type: 'text', required: true},
        descriptions: {type: 'text', required: true},
        imageUrl: {type: 'text', required: true, mapsTo: 'image_url'},
        createdAt: {type: 'date', time: true, mapsTo: 'created_at'},
        updatedAt: {type: 'date', time: true, mapsTo: 'updated_at'}
    }, {
        autoFetch: true,
        hooks: {
            beforeCreate: function () {
                this.createdAt = new Date()
            }
        }
    })

    cb()
}