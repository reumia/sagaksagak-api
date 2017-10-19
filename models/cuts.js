module.exports = (db, cb) => {
    db.define('cuts', {
        status: {type: 'enum', values: ['OPENED', 'CLOSED', 'BLOCKED']},
        title: {type: 'text', required: true},
        descriptions: {type: 'text'},
        imageUrl: {type: 'text', mapsTo: 'image_url', required: true},
        createdAt: {type: 'date', time: true, mapsTo: 'created_at'}
    }, {
        hooks: {
            beforeCreate () {
                this.createdAt = new Date()
            }
        }
    })

    cb()
}