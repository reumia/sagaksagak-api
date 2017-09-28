module.exports = (db, cb) => {
    db.define('comics', {
        status: {type: 'enum', values: ['OPENED', 'CLOSED', 'LOCKED', 'BLOCKED']},
        title: {type: 'text'},
        descriptions: {type: 'text'},
        image_url: {type: 'text'},
        created_at: {type: 'date'}
    }, {
        hooks: {
            beforeCreate: function () {
                this.created_at = new Date()
            }
        }
    })

    cb()
}