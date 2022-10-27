async function authorization(req, res, next) {
    try {
        if (req.user.email === "admin@hamparanstone.com") {
            next()
        } else {
            throw { name: "Forbidden" }
        }
    } catch (error) {
        next(error)
    }
}

module.exports = authorization