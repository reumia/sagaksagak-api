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
    const LikesCut = db.models['likes_cuts']

    // User.hasOne('person', Person, {reverse: 'user'})

    return cb()
}

