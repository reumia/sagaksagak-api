module.exports = function (db, cb) {
    db.load("./users.js", function (err) { if (err) return cb(err) })
    db.load("./comics.js", function (err) { if (err) return cb(err) })
    db.load("./cuts.js", function (err) { if (err) return cb(err) })
    db.load("./likes_user.js", function (err) { if (err) return cb(err) })
    db.load("./likes_comic.js", function (err) { if (err) return cb(err) })
    db.load("./likes_cut.js", function (err) { if (err) return cb(err) })

    const Users = db.models['users']
    const Comics = db.models['comics']
    const Cuts = db.models['cuts']
    const LikesUser = db.models['likes_user']
    const LikesComic = db.models['likes_comic']
    const LikesCut = db.models['likes_cut']

    Comics.hasOne('owner', Users)
    Cuts.hasOne('owner', Users)
    Cuts.hasOne('comic', Comics)
    LikesUser.hasOne('target', Users)
    LikesUser.hasOne('user', Users)
    LikesComic.hasOne('target', Comics)
    LikesComic.hasOne('user', Users)
    LikesCut.hasOne('target', Cuts)
    LikesCut.hasOne('user', Users)


    db.sync(err => {
        if (err) throw err

        // Users.create({
        //     status: 'OPENED',
        //     password: 'asdqwe',
        //     name: '하하맨',
        //     descriptions: '하하맨은 항상 웃고 다닙니다. 그러나 가끔 화가나면 화화맨으로 변신하곤 하지요. 조심해 X꺄.',
        //     email: 'zzo.sktx@sk.com',
        //     site: 'http://www.ifkiller.com/'
        // }, err => {
        //     if (err) throw err
        //     console.log('User Added.')
        // })
    })

    return cb()
}

