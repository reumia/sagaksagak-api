module.exports = (router) => {
    router.use(function timeLog(req, res, next) {
        console.log('Time: ', Date.now())
        next()
    })
    router.use(function isAuthorized(req, res, next) {
        // TODO : 로그인 여부 인증처리
        console.log(Boolean(req.session.email))
        if (Boolean(req.session.email) === false) res.status(401)
        next()
    })
}