module.exports = (router) => {
    router.use(function timeLog(req, res, next) {
        console.log('Time: ', Date.now())
        next()
    })
}