const axios = require("axios")

class Controller {
    static async getQuotes(req, res,  next) {
        try {
            const { data } = await axios({
                url: 'https://zenquotes.io/api/quotes',
                method: 'get'
            })
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({msg: "internal server error"})
        }
    }
}

module.exports = Controller