const aws = require('aws-sdk');
const multer = require('multer')
const multerS3 = require('multer-s3')
//const { access } = require('fs');

aws.config.update({
    secretAccessKey: 'yL34r0Gf7cghRBgCeafJsNwg0SUFE2mkBvQSBA2d',
    accessKeyId: 'AKIAVG3MBBRV5B4UXZXK',
    region: 'us-west-1' 
});

const awsClient = new aws.S3();
var date = Date.now().toString();
var item=""; 

var upload = multer({
    storage: multerS3({
        s3: awsClient,
        bucket: 'csc648-team2',
        acl: 'public-read',
        metadata: function (req,file,cb){
            cb(null,{fieldName:file.fieldname});
        },
        key: function(req,file,cb){
            cb(null,date+ '-'+file.originalname);
        }
    })
});
itemKey = multerS3.key;
var itemkey = date.concat("-"+item);
module.exports = {upload, itemkey }
