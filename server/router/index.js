const router = require('express').Router()
const authentication = require('../middlewares/authentication')
const userRouter = require('../router/userRouter')
const companyRouter = require('../router/companyRouter')
const employeeRouter = require('../router/employeeRouter')

router.use('/user', userRouter)
router.use(authentication)
router.use('/company', companyRouter)
router.use('/employee', employeeRouter)

module.exports = router