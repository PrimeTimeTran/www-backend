const fs = require('fs')

const S3 = require('aws-sdk/clients/s3')
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

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

const client = new S3Client({
  region,
  accessKeyId,
  secretAccessKey
});

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

s3Helper.getFileStream = async (fileKey) => {
  const objectParams = {
    Key: fileKey,
    Bucket: bucketName
  }

  const command = new GetObjectCommand(objectParams);
  const url = await getSignedUrl(client, command, { expiresIn: 3600 });

  return url
}

module.exports = s3Helper;