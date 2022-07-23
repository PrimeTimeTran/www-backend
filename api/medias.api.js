const express = require('express')
const path = require('path');

const router = express.Router()
const multer = require('multer')

const upload = multer({ dest: 'uploads/' })


const videoStorage = multer.diskStorage({
  destination: 'videos', // Destination to store video 
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now()
      + path.extname(file.originalname))
  }
});

const videoUpload = multer({
  storage: videoStorage,
  limits: {
    fileSize: 10000000 // 10000000 Bytes = 10 MB
  },
  fileFilter(req, file, cb) {
    // upload only mp4 and mkv format
    if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) {
      return cb(new Error('Please upload a video'))
    }
    cb(undefined, true)
  }
})

const mediaController = require('../controllers/medias.controller')

router.post("/", videoUpload.single('media'), mediaController.create)
// router.get("/", mediaController.list)

module.exports = router