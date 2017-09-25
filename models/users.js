import orm from 'orm'
import bcrypt from 'bcrypt'

module.exports = (db, cb) => {
    db.define('users', {
        status: {type: 'enum', values: ['OPENED', 'DROPPED', 'BLOCKED']},
        password: {type: 'text', required: true},
        name: {type: 'text', unique: true},
        descriptions: {type: 'text'},
        email: {type: 'text', unique: true, required: true},
        site: {type: 'text'},
        profile_image_url: {type: 'text'},
        featured_image_url: {type: 'text'},
        created_at: {type: 'date'},
        drop_at: {type: 'date'}
    }, {
        validations: {
            email: [
                orm.enforce.unique('이미 존재하는 E-mail 입니다.'),
                orm.enforce.patterns.email('올바른 E-mail을 입력해 주세요.')
            ],
            password: [
                orm.enforce.ranges.length(8, 24, '비밀번호는 최소 8자리, 최대 24자리까지 입력 가능합니다.')
            ]
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