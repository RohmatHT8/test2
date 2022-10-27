const { Employee } = require('../models')
class Controller {
    static async createEmployee(req, res, next) {
        try {
            const { firstName, lastName, CompanyId, email, phone } = req.body
            const employee = await Employee.create({ firstName, lastName, CompanyId, email, phone })
            res.status(201).json(employee)
        } catch (error) {
            next(error)
        }
    }
    static async getEmployees(req, res, next) {
        try {
            const employees = await Employee.findAll()
            res.status(200).json(employees)
        } catch (error) {
            next(error)
        }
    }
    static async updateEmployee(req, res, next) {
        try {
            const { firstName, lastName, CompanyId, email, phone } = req.body
            const { id } = req.params
            await Employee.update({ firstName, lastName, CompanyId, email, phone }, { where: { id } })
            res.status(200).json({msg: "Employee Updated"})
        } catch (error) {
            next(error)
        }
    }
    static async deletedEmployee(req, res, next) {
        try {
            const { id } = req.params
            await Employee.destroy({where: {id}})
            res.status(200).json({msg: "Employee deleted"})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller