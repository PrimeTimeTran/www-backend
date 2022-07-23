const express = require('express')
const router = express.Router()
const multer = require('multer')

const upload = multer({ dest: 'uploads/' })

const mediaController = require('../controllers/medias.controller')

router.post("/", mediaController.create)
router.get("/", mediaController.list)

module.exports = router