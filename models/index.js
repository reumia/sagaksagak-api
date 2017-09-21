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

    Comics.hasOne('owner', Users, {reverse: 'users'})
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

        // 유저 생성
        // Users.create({
        //     status: 'OPENED',
        //     password: 'asdqwe',
        //     name: '흑흑맨',
        //     descriptions: '흑흑맨은 항상 울고 다닙니다. 그러나 가끔 현자타임이 돠면 후후맨으로 변신하곤 하지요. 세상일 다 세옹지마입니다.',
        //     email: 'zzo.skt@sk.com',
        //     site: 'http://www.ifkiller.com/'
        // }, err => {
        //     if (err) throw err
        //     console.log('User Added.')
        // })

        // 코믹 생성
        // Comics.create({
        //     status: 'CLOSED',
        //     title: '흑흑맨의 일기',
        //     descriptions: '항상 우는 흑흑맨의 일기입니다. 자칫 너무 우울할 수 있으니 조심해 X꺄.',
        // }, (err, comics) => {
        //     if (err) throw err
        //     Users.getAsync(2)
        //         .then(user => {
        //             comics.setOwner(user, err => {
        //                 if (err) throw err
        //                 console.log('Comic Added.')
        //             })
        //         }).error(err => {
        //             if (err) throw err
        //         })
        // })
    })

    return cb()
}

