module.exports = (db, cb) => {
    db.define('comics', {
        status: {type: 'enum', values: ['READY', 'OPENED', 'CLOSED', 'LOCKED', 'BLOCKED']},
        title: {type: 'text', required: true},
        descriptions: {type: 'text', required: true},
        image_url: {type: 'text', required: true},
        created_at: {type: 'date', time: true},
        updated_at: {type: 'date', time: true}
    }, {
        autoFetch: true,
        hooks: {
            beforeCreate: function () {
                this.created_at = new Date()
            }
        }
    })

    cb()
}