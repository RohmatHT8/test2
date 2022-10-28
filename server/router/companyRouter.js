const router = require('express').Router()
const Controller = require('../controller/companiesController')
const authorization = require('../middlewares/authorization')
router.post('/', Controller.createCompany)
router.get('/', Controller.getCompanies)
router.get('/:id', Controller.getCompany)
router.put('/:id', authorization, Controller.updateCompany)
router.delete('/delete/:id', authorization, Controller.deleteCompany)

module.exports = router