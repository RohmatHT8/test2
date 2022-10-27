require("dotenv").config()
const express = require('express')
const cors = require('cors')
const errorHandle = require('./middlewares/errorHandle')
const app = express()
const port = 3000
const router = require('./router/index')

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/', router)

app.use(errorHandle)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})