const aws = require('aws-sdk');
var multer = require('multer')
var multerS3 = require('multer-s3')
//const { access } = require('fs');

var awsClient = null;

const connect = async() =>{
    if(awsClient == null){
        const pool = aws.config.update({
            secretAccessKey: 'yL34r0Gf7cghRBgCeafJsNwg0SUFE2mkBvQSBA2d',
            accessKeyId: 'AKIAVG3MBBRV5B4UXZXK',
            region: 'us-west-1' 
        });
        awsClient = pool.promise();
        console.log("AWS connected")
    }
}

s3 = new aws.S3();
const client = ()=>{
    return awsClient
}
var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'csc648-team2'
    })
})