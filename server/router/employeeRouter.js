const router = require("express").Router()
const Controller = require("../controller/employeesController")
const authorization = require("../middlewares/authorization")

router.post('/', Controller.createEmployee)
router.get('/', Controller.getEmployees)
router.get('/:id', Controller.getEmployee)
router.put('/edit/:id', authorization, Controller.updateEmployee)
router.delete('/delete/:id', authorization, Controller.deletedEmployee)

module.exports = router