const express = require('express');
const router = express.Router();

const questionController = require('../controllers/questions.controller')

router.get("/", questionController.list);

module.exports = router;