const express = require('express')
const router = express.Router()

const { videoUpload } = require('../helpers/s3.helper')

const mediaController = require('../controllers/medias.controller')

router.post("/", videoUpload.single('media'), mediaController.create)

module.exports = router