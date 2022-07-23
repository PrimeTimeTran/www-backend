const express = require('express')
const router = express.Router()

const usersRouter = require("./users.api")
router.use('/users', usersRouter)

const mediaRouter = require("./medias.api")
router.use('/medias', mediaRouter)

module.exports = router
