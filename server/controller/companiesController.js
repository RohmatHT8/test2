const { Company } = require('../models')
class Controller {
    static async createCompany(req, res, next) {
        try {
            const { name, email, logo, website } = req.body
            const company = await Company.create({ name, email, logo, website })
            res.status(201).json(company)
        } catch (error) {
            next(error)
        }
    }
    static async getCompanies(req, res, next) {
        try {
            const companies = await Company.findAll({order:[["updatedAt", "ASC"]]})
            res.status(200).json(companies)
        } catch (error) {
            next(error)
        }
    }
    static async getCompany(req, res, next) {
        try {
            const { id } = req.params
            console.log(id)
            const company = await Company.findByPk(id)
            res.status(200).json(company)
        } catch (error) {
            next(error)
        }
    }
    static async updateCompany(req, res, next) {
        try {
            const { id } = req.params
            const { name, email, logo, website } = req.body
            const company = await Company.update({ name, email, logo, website }, { where: { id } })
            res.status(200).json({ msg: "success update data" })
        } catch (error) {
            next(error)
        }
    }
    static async deleteCompany(req, res, next) {
        try {
            const { id } = req.params
            const company = await Company.destroy({ where: { id } })
            res.status(200).json({ msg: "Company deleted" })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller