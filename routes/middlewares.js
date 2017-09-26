const timeLog = (req, res, next) => {
    console.log('Time: ', Date.now())
    next()
}
const checkAuthorization = (req, res, next) => {
    const isAuthorized = Boolean(req.session.email) === true
    const ignores = [
        'users',
        'user/',
        'comics',
        'comic/'
    ]

    if (isAuthorized) next()
    else res.status(401).send()
}

module.exports = (router) => {
    router.use(timeLog)
}