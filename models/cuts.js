module.exports = (db, cb) => {
    db.define('cuts', {
        status: {type: 'enum', values: ['OPENED', 'CLOSED', 'BLOCKED']},
        parent_id: {type: 'integer'},
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