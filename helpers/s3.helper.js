const fs = require('fs')
const path = require('path');
const multer = require('multer')
const S3 = require('aws-sdk/clients/s3')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const s3Helper = {}

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})


s3Helper.uploadFile = (file) => {
  const fileStream = fs.createReadStream(file.path)
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
    ContentType: "video/mp4"
  }

  return s3.upload(uploadParams).promise()
}

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
    fileSize: 10000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) {
      return cb(new Error('Please upload a video'))
    }
    cb(undefined, true)
  }
})

s3Helper.videoUpload = videoUpload
s3Helper.unlinkFile = unlinkFile


module.exports = s3Helper;