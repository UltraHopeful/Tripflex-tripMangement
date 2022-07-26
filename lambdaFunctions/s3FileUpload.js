const AWS = require('aws-sdk')
AWS.config.update({ region: process.env.REGION })
const s3 = new AWS.S3();

const targetBucket = 'tripflex-images'
// let fileNameTobe = "";

exports.handler = async (event) => {
  console.log(event)
  // fileNameTobe =  event.queryStringParameters.filename;
  // console.log(fileNameTobe);
  const result = await getUploadURL()
  console.log('Result: ', result)
  return result
};

// cite : https://github.com/aws-samples/s3-to-lambda-patterns/blob/master/videos-samples/5-s3-uploader/app.js
// cite : https://jsfiddle.net/jbeswick/jsxbv0ny/4/
// cite : https://www.youtube.com/watch?v=mw_-0iCVpUc&list=PLJo-rJlep0EAY0nMNBv0MZ487l1tOFAjh&index=7
const getUploadURL = async function() {
  console.log('Get url for uploading file')
  // make current date as file name
  let fileName = Date.now()

  var s3Params = {
    Bucket: targetBucket,
    Key:  `${fileName}.jpg`,
    ContentType: 'image/jpeg',
    CacheControl: 'max-age=31104000',
    ACL: 'public-read',   // Optional if you want the object to be publicly readable
  };

  return new Promise((resolve, reject) => {
    console.log("get signed url to upload object")
    let uploadURL = s3.getSignedUrl('putObject', s3Params)
    resolve({
      "statusCode": 200,
      "isBase64Encoded": false,
      "headers": {
        "Access-Control-Allow-Origin": "*"
      },
      "body": JSON.stringify({
          "uploadURL": uploadURL,
          "imageName": `${fileName}.jpg`
      })
    })
  })
}
