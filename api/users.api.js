const express = require('express');
const router = express.Router();

const userController = require('../controllers/users.controller')

router.post("/", userController.create);
router.get("/", userController.list);
router.get("/:username", userController.read);
router.put("/:id", userController.update);
router.delete("/:id", userController.destroy);

module.exports = router;