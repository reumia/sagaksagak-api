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
            },
            async afterLoad (next) {
                const cuts = await this.getCutsAsync()
                const likes = await this.getLikesAsync()

                this.cuts = cuts.length
                this.likes = likes.length

                next()
            }
        }
    })

    cb()
}