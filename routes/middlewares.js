module.exports = (router) => {
    router.use(function timeLog(req, res, next) {
        console.log('Time: ', Date.now())
        next()
    })
    router.use(function checkAuthorization(req, res, next) {
        const isAuthorized = Boolean(req.session.email) === true

        if (isAuthorized) next()
        else res.status(401).send()
    })
}