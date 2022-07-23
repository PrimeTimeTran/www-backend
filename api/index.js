const express = require('express')
const router = express.Router()

const usersRouter = require("./users.api")
router.use('/users', usersRouter)

const mediaRouter = require("./medias.api")
router.use('/medias', mediaRouter)

const questionRouter = require("./questions.api")
router.use('/questions', questionRouter)

module.exports = router
