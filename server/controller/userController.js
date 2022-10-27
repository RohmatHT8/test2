const { comparePassword } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')
const {User} = require('../models')
class Controller {
    static async login(req, res, next) {
        try {
            const { email, password } = req.body

            const data = await User.findOne({
                where: {
                    email: email
                }
            })
            if (!data) {
                throw { name: "invalidInput" }
            }
            const isValid = comparePassword(password, data.password)
            if (!isValid) {
                throw { name: "invalidInput" }
            }

            const access_token = createToken({ id: data.id, data: data.email })

            res.status(200).json({ access_token })

        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller