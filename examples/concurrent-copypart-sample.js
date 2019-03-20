/**
 * This sample demonstrates how to multipart upload an object concurrently by copy mode 
 * to OBS using the OBS SDK for Nodejs.
 */

'use strict';
var fs = require('fs');
 
var ObsClient;
try{
	ObsClient = require('./lib/obs');
}catch(e){
	ObsClient = require('../lib/obs');//sample env
}

/*
 * Initialize a obs client instance with your account for accessing OBS
 */
var obs = new ObsClient({
	access_key_id: '*** Provide your Access Key ***',
	secret_access_key: '*** Provide your Secret Key ***',
	server : 'yourdomainname'
});

var bucketName = 'my-obs-bucket-demo';
var sourceBucketName = bucketName;
var sourceObjectKey = 'my-obs-object-key-demo';
var objectKey = sourceObjectKey + '-back';

var pathLib = require('path');
var sampleFilePath = '/temp/text.txt';

function mkdirsSync(dirname){
    if(fs.existsSync(dirname)){
        return true;
    }else{
        if(mkdirsSync(pathLib.dirname(dirname))){
            fs.mkdirSync(dirname);
            return true;
        }
    }
}

function createSampleFileSync(sampleFilePath){
	if(!fs.existsSync(sampleFilePath)){
		mkdirsSync(pathLib.dirname(sampleFilePath));
		var fd = fs.openSync(sampleFilePath, 'w');
		if(fd){
			for(let i=0;i < 1000000;i++){
				fs.writeSync(fd, String(Math.random()) + '\n');
				fs.writeSync(fd, String(Math.random()) + '\n');
				fs.writeSync(fd, String(Math.random()) + '\n');
				fs.writeSync(fd, String(Math.random()) + '\n');
			}
			fs.closeSync(fd);
		}
	}
	return sampleFilePath;
}

/*
 * Create bucket 
 */
obs.createBucket({
	Bucket : bucketName
}, (err, result) => {
	if(!err && result.CommonMsg.Status < 300){
		console.log('Create bucket for demo\n');
        /*
         * Upload an object to your source bucket
         */
		obs.putObject({
			Bucket : sourceBucketName,
			Key : sourceObjectKey,
			SourceFile : createSampleFileSync(sampleFilePath)
		}, (err, result) => {
			if(!err && result.CommonMsg.Status < 300){
				console.log('Upload a new object to OBS from a file finished\n');
	            /*
	             * Claim a upload id firstly
	             */
				obs.initiateMultipartUpload({
					Bucket : bucketName,
					Key : objectKey
				}, (err, result) => {
					if(!err && result.CommonMsg.Status < 300){
						var uploadId = result.InterfaceResult.UploadId;
						console.log('Claim a new upload id ' + uploadId + '\n');
						var partSize = 5 * 1024 * 1024;// 5MB
						obs.getObjectMetadata({
							Bucket : sourceBucketName,
							Key : sourceObjectKey
						}, (err, result) => {
							if(!err && result.CommonMsg.Status < 300){
								var objectSize = Number(result.InterfaceResult.ContentLength);
								var partCount = objectSize % partSize === 0 ? Math.floor(objectSize / partSize) : Math.floor(objectSize / partSize) + 1;
								console.log('Total parts count ' + partCount  + '\n'); 
								
								var events = require('events');
								var eventEmitter = new events.EventEmitter();
								var parts = [];
								/*
					             * Upload multiparts by copy mode
					             */
								console.log('Begin to upload multiparts to OBS by copy mode\n');
								for(let i=0;i<partCount;i++){
									let rangeStart = i * partSize;
									let rangeEnd = (i + 1) === partCount ? objectSize -1 : rangeStart + partSize - 1;
									let partNumber = i + 1;
									obs.copyPart({
										Bucket: bucketName,
										Key: objectKey,
										PartNumber : partNumber,
										UploadId : uploadId,
										CopySource: sourceBucketName + '/' + sourceObjectKey,
										CopySourceRange : 'bytes=' + rangeStart + '-' + rangeEnd
									}, (err, result) => {
										if(!err && result.CommonMsg.Status < 300){
											parts.push({PartNumber : partNumber, ETag : result.InterfaceResult.ETag});
											if(parts.length === partCount){
												/*
												 * Sort parts order by partNumber asc
												 */
												var _parts = parts.sort((a, b) => {
													if(a.PartNumber >= b.PartNumber){
														return 1;
													}
													return -1;
												});
												eventEmitter.emit('copy part finished', _parts);
											}
										}else{
											throw new Error(err || result.CommonMsg.Code);
										}
									});
								}
								
								/*
								 * Waiting for all parts finished
								 */
								eventEmitter.on('copy part finished', (parts) => {
									console.log('Succeed to complete multiparts into an object named ' + objectKey);
									
									/*
									 * View all parts uploaded recently
									 */
									obs.listParts({
										Bucket: bucketName,
										Key: objectKey,
										UploadId: uploadId
									},(err, result) => {
										if(!err && result.CommonMsg.Status < 300){
											console.log('Listing all parts:');
											for(let i=0;i<result.InterfaceResult.Parts.length;i++){
												console.log('\tPart['+(i+1)+']:');
												console.log('\tPartNumber-->' + result.InterfaceResult.Parts[i]['PartNumber']);
												console.log('\tETag-->' + result.InterfaceResult.Parts[i]['ETag']);
												console.log('\tSize-->' + result.InterfaceResult.Parts[i]['Size']);
											}
											console.log('\n');
											/*
											 * Complete to upload multiparts
											 */
											obs.completeMultipartUpload({
												Bucket: bucketName,
												Key: objectKey,
												UploadId: uploadId,
												Parts: parts
											}, (err, result) => {
												if(!err && result.CommonMsg.Status < 300){
													console.log('Complete to upload multiparts finished.\n');
												}
											});
										}
									});
								});
							}
						});
					}
				});
				
			}
		});
	}
});

var process = require('process');
process.on('beforeExit', (code) => {
	if(fs.existsSync(sampleFilePath)){
		fs.unlinkSync(sampleFilePath);
	}
	obs.close();
});

