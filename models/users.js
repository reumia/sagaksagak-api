import orm from 'orm'
import bcrypt from 'bcrypt'

module.exports = (db, cb) => {
    db.define('users', {
        status: {type: 'enum', values: ['OPENED', 'DROPPED', 'BLOCKED']},
        password: {type: 'text'},
        name: {type: 'text', unique: true},
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
        },
        hooks: {
            beforeCreate: function () {
                this.created_at = new Date()
            },
            beforeSave: function () {
                if (this.password) {
                    console.log('Hashing password...')
                    const salt = bcrypt.genSaltSync(10)
                    this.password = bcrypt.hashSync(this.password, salt)
                }
            }
        }
    })

    cb()
}