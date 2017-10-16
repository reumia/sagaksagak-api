import orm from 'orm'

module.exports = (db, cb) => {
    db.define('users', {
        status: {type: 'enum', values: ['OPENED', 'DROPPED', 'BLOCKED']},
        password: {type: 'text', required: true},
        name: {type: 'text', required: true},
        descriptions: {type: 'text'},
        email: {type: 'text', unique: true, required: true},
        site: {type: 'text'},
        imageUrl: {type: 'text', mapsTo: 'image_url'},
        createdAt: {type: 'date', time: true, mapsTo: 'created_at'},
        dropAt: {type: 'date', time: true, mapsTo: 'drop_at'}
    }, {
        autoFetch: true,
        validations: {
            email: [
                orm.enforce.unique('이미 존재하는 E-mail 입니다.'),
                orm.enforce.patterns.email('올바른 E-mail을 입력해 주세요.')
            ]
        },
        hooks: {
            beforeCreate (next) {
                this.createdAt = new Date()
                next()
            }
        }
    })

    cb()
}