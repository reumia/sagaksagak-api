import orm from 'orm'

module.exports = (db, cb) => {
    db.define('users', {
        status_id: {type: 'integer'},
        password: {type: 'text'},
        name: {type: 'text'},
        descriptions: {type: 'text'},
        email: {type: 'text', unique: true},
        site: {type: 'text'},
        profile_image_url: {type: 'text'},
        featured_image_url: {type: 'text'},
        created_at: {type: 'date'},
        drop_at: {type: 'date'}
    }, {
        validations: {
            email: orm.enforce.unique('email is already exist!')
        }
    })

    cb()
}