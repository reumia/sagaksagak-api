module.exports = (call) => {
    try {
        call()
    }
    catch (err) {
        console.log(err)
    }
}
