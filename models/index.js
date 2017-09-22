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

    Comics.hasOne('owner', Users, {reverse: 'comics'})
    Cuts.hasOne('owner', Users, {reverse: 'cuts'})
    Cuts.hasOne('comic', Comics, {reverse: 'cuts'})
    LikesUser.hasOne('target', Users, {reverse: 'likes'})
    LikesUser.hasOne('user', Users, {reverse: 'likeUsers'})
    LikesComic.hasOne('target', Comics, {reverse: 'likes'})
    LikesComic.hasOne('user', Users, {reverse: 'likeComics'})
    LikesCut.hasOne('target', Cuts, {reverse: 'likes'})
    LikesCut.hasOne('user', Users, {reverse: 'likeCuts'})

    db.sync(err => {
        if (err) throw err

        // Users.create({
        //     status: 'OPENED',
        //     password: 'asdqwe',
        //     name: '흑흑맨',
        //     descriptions: '흑흑맨은 항상 울고 다닙니다. 그러나 가끔 현자타임이 되면 후후맨으로 변신하곤 하지요. 세상일 다 세옹지마입니다.',
        //     email: 'zzo.skt@sk.com',
        //     site: 'http://www.ifkiller.com/'
        // }, err => {
        //     if (err) throw err
        //     console.log('User 흑흑맨 Added.')
        // })
        // Users.create({
        //     status: 'OPENED',
        //     password: 'asdqwe',
        //     name: '하하맨',
        //     descriptions: '하하맨은 항상 웃고 다닙니다. 그러나 가끔 힘이들면 하악하악맨으로 변신합니다. 조심하세요, 그는 욕망의 노예입니다.',
        //     email: 'zzo.sktx@sk.com',
        //     site: 'http://www.ifkiller.com/'
        // }, err => {
        //     if (err) throw err
        //     console.log('User 하하맨 Added.')
        // })
        //
        // Comics.create({
        //     status: 'CLOSED',
        //     title: '흑흑맨의 일기',
        //     descriptions: '항상 우는 흑흑맨의 일기입니다. 자칫 너무 우울할 수 있으니 조심해 X꺄.',
        // }, (err, comics) => {
        //     if (err) throw err
        //     Users.getAsync(3)
        //         .then(user => {
        //             comics.setOwner(user, err => {
        //                 if (err) throw err
        //                 console.log('Comic 흑흐맨의 일기 Added.')
        //             })
        //         }).catch(err => {
        //             if (err) throw err
        //         })
        // })
        // Comics.create({
        //     status: 'OPENED',
        //     title: '현자타임 후후맨',
        //     descriptions: '세상은 다 별거 없어. 크큭 흑화하는 후후맨의 이야기. 너에겐 아무런 즐거움도 남아있지 않아.',
        // }, (err, comics) => {
        //     if (err) throw err
        //     Users.getAsync(3)
        //         .then(user => {
        //             comics.setOwner(user, err => {
        //                 if (err) throw err
        //                 console.log('Comic 현자타임 후후맨 Added.')
        //             })
        //         }).catch(err => {
        //             if (err) throw err
        //         })
        // })
    })

    return cb()
}

