/**
 * This sample demonstrates how to do bucket-related operations
 * (such as do bucket ACL/CORS/Lifecycle/Logging/Website/Location/Tagging/OPTIONS) 
 * on OBS using the OBS SDK for Nodejs.
 */

'use strict';
 
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

/*
 * Put bucket operation
 */
obs.createBucket({
	Bucket : bucketName,
}, (err, result) => {
	if(err){
		console.error('err:' + err);
		return;
	}
	
	if(result.CommonMsg.Status > 300){
		console.error('Create bucket failed.');
		return;
	}
	
	console.log('Create bucket:' + bucketName + ' successfully!\n');
	
	/*
     * Get bucket location operation
     */
	obs.getBucketLocation({
		Bucket : bucketName
	}, (err, result) => {
		if(!err && result.CommonMsg.Status < 300){
			console.log('Get bucket location ' + result.InterfaceResult.Location + '\n');
		}
	});
	
    /*
     * Get bucket storageInfo operation 
     */
	obs.getBucketStorageInfo({
		Bucket : bucketName
	},(err, result) => {
		if(!err && result.CommonMsg.Status < 300){
			console.log('Get bucket storageInfo:');
			console.log('\tsize:' + result.InterfaceResult.Size);
			console.log('\tobjectNumber:' + result.InterfaceResult.ObjectNumber);
			console.log('\n');
		}
	});
	
	 /*
     * Put/Get bucket quota operations
     */
	obs.setBucketQuota({
		Bucket : bucketName,
		StorageQuota : 1024 * 1024 * 1024
	},(err, result) => {
		obs.getBucketQuota({
			Bucket : bucketName
		}, (err, result) => {
			if(!err && result.CommonMsg.Status < 300){
				console.log('Get bucket quota ' + result.InterfaceResult.StorageQuota + '\n');
			}
		} );
	});
	
	/*
	 * Put/Get bucket versioning operations
	 */
	obs.getBucketVersioningConfiguration({
		Bucket : bucketName
	}, (err, result) => {
		if(!err && result.CommonMsg.Status < 300){
			console.log('Default bucket versioning config ' + result.InterfaceResult.VersionStatus + '\n');
			obs.setBucketVersioningConfiguration({
				Bucket : bucketName,
				VersionStatus : 'Enabled'
			}, (err, result) => {
				if(!err && result.CommonMsg.Status < 300){
					console.log('Enable bucket versioning finished.' + '\n');
					obs.getBucketVersioningConfiguration({
						Bucket : bucketName
					}, (err, result) => {
						console.log('Current bucket versioning config ' + result.InterfaceResult.VersionStatus + '\n');
					});
				}
			});
		}
	});
	
	
    /*
     * Put/Get bucket acl operations
     */
	obs.setBucketAcl({
		Bucket : bucketName,
		ACL : obs.enums.AclPublicRead
	}, (err, result) => {
		if(!err && result.CommonMsg.Status < 300){
			console.log('Set bucket ACL to public read finished. \n');
			obs.getBucketAcl({
				Bucket : bucketName
			}, (err, result) => {
				if(!err && result.CommonMsg.Status < 300){
					console.log('Get bucket ACL:');
					console.log('\tOwner[ID]-->' + result.InterfaceResult.Owner.ID);
					console.log('\tOwner[Name]-->' + result.InterfaceResult.Owner.Name);
					console.log('\tGrants:');
					for(let i=0;i<result.InterfaceResult.Grants.Grant.length;i++){
						console.log('\tGrant[' + i + ']:');
						console.log('\tGrantee[ID]-->' + result.InterfaceResult.Grants.Grant[i]['Grantee']['ID']);
						console.log('\tGrantee[Name]-->' + result.InterfaceResult.Grants.Grant[i]['Grantee']['Name']);
						console.log('\tGrantee[URI]-->' + result.InterfaceResult.Grants.Grant[i]['Grantee']['URI']);
						console.log('\tPermission-->' + result.InterfaceResult.Grants.Grant[i]['Permission']);
					}
					console.log('\n');
					
				    /*
				     * Put/Get/Delete bucket logging operations
				     */
					obs.setBucketAcl({
						Bucket : bucketName,
						ACL : obs.enums.AclLogDeliveryWrite
					}, (err, result) => {
						if(!err && result.CommonMsg.Status < 300){
							obs.setBucketLoggingConfiguration({
								Bucket: bucketName,
								LoggingEnabled:{
									TargetBucket:bucketName,
									TargetPrefix:'log-'
								}
							}, (err, result) => {
								if(!err && result.CommonMsg.Status < 300){
									console.log('Set bucket logging finished.\n');
									obs.getBucketLoggingConfiguration({
										Bucket : bucketName
									}, (err, result) => {
										if(!err && result.CommonMsg.Status < 300){
											console.log('Get bucket logging:');
											console.log('\tTargetBucket-->' + result.InterfaceResult.LoggingEnabled.TargetBucket);
											console.log('\tTargetPrefix-->' + result.InterfaceResult.LoggingEnabled.TargetPrefix);
											console.log('\n');
											
											obs.setBucketLoggingConfiguration({
												Bucket : bucketName
											}, (err, result) => {
												if(!err && result.CommonMsg.Status < 300){
													console.log('Delete bucket logging finished.\n');
												}
											});
										}
									});
								}
							});
						}
					});
					
				}
			});
		}
	});
	
    /*
     * Put/Get/Delete bucket cors operations
     */
	obs.setBucketCors({
		Bucket : bucketName,
		CorsRule:[
		    {
				AllowedMethod:['PUT','HEAD','GET'],
				AllowedOrigin:['http://www.a.com','http://www.b.com'],
				AllowedHeader: ['Authorization'],
				ExposeHeader:['x-obs-test1', 'x-obs-test2'],
				MaxAgeSeconds:100
			},
			{
				AllowedMethod:['PUT','POST','GET'],
				AllowedOrigin:['http://www.c.com','http://www.d.com'],
				AllowedHeader: ['Authorization'],
				ExposeHeader:['x-obs-test3','x-obs-test4'],
				MaxAgeSeconds:50
			}
			]
	}, (err, result) => {
		if(!err && result.CommonMsg.Status < 300){
			console.log('Set bucket CORS finished.\n');
			obs.getBucketCors({
				Bucket : bucketName
			}, (err, result) => {
				if(!err && result.CommonMsg.Status < 300){
					console.log('Get bucket CORS:');
					for(let k=0;k<result.InterfaceResult.CorsRule.length;k++){
						console.log('\tCorsRule[',k,']');
						console.log('\tCorsRule[ID]-->' + result.InterfaceResult.CorsRule[k]['ID']);
						console.log('\tCorsRule[MaxAgeSeconds]-->' + result.InterfaceResult.CorsRule[k]['MaxAgeSeconds']);
						for (let i=0;i<result.InterfaceResult.CorsRule[k]['AllowedMethod'].length;i++){
							console.log('\tCorsRule[AllowedMethod][' , (i+1) ,']-->'+result.InterfaceResult.CorsRule[k]['AllowedMethod'][i]);
						}
						for(let i=0;i<result.InterfaceResult.CorsRule[k]['AllowedOrigin'].length;i++){
							console.log('\tCorsRule[AllowedOrigin][',(i+1) ,']-->'+result.InterfaceResult.CorsRule[k]['AllowedOrigin'][i]);
						}
						for(let i=0;i<result.InterfaceResult.CorsRule[k]['AllowedHeader'].length;i++){
							console.log('\tCorsRule[AllowedHeader]',(i+1),']-->'+result.InterfaceResult.CorsRule[k]['AllowedHeader'][i]);
						}
						for(let i=0;i<result.InterfaceResult.CorsRule[k]['ExposeHeader'].length;i++){
							console.log('\tCorsRule[ExposeHeader][',(i+1) ,']-->'+result.InterfaceResult.CorsRule[k]['ExposeHeader'][i]);
						}	
					}
					console.log('\n');
				}
			});
			
			/*
		     * Options bucket operation
		     */
			obs.optionsBucket({
				Bucket : bucketName, 
				Origin : 'http://www.c.com',
				AccessControlRequestMethods : ['PUT'],
				AccessControlRequestHeaders : ['Authorization']
			}, (err, result) => {
				if(!err && result.CommonMsg.Status < 300){
					console.log('Options bucket:');
					console.log('AccessContorlAllowOrigin-->' + result.InterfaceResult.AccessContorlAllowOrigin);	
					console.log('AccessContorlAllowHeaders-->' + result.InterfaceResult.AccessContorlAllowHeaders);	
					console.log('AccessContorlAllowMethods-->' + result.InterfaceResult.AccessContorlAllowMethods);	
					console.log('AccessContorlExposeHeaders-->' + result.InterfaceResult.AccessContorlExposeHeaders);	
					console.log('AccessContorlMaxAge-->' + result.InterfaceResult.AccessContorlMaxAge);
					console.log('\n');
				}
			});
			
		    /*
		     * Get bucket metadata operation
		     */
			obs.getBucketMetadata({
				Bucket : bucketName,
				Origin : 'http://www.a.com',
				RequestHeader : 'Authorization'
			}, (err, result) => {
				if(!err && result.CommonMsg.Status < 300){
					console.log('Get bucket metadata:');
					console.log('StorageClass-->' + result.InterfaceResult.StorageClass);
					console.log('AllowOrigin-->' + result.InterfaceResult.AllowOrigin);
					console.log('MaxAgeSeconds-->' + result.InterfaceResult.MaxAgeSeconds);
					console.log('ExposeHeader-->' + result.InterfaceResult.ExposeHeader);
					console.log('AllowMethod-->' + result.InterfaceResult.AllowMethod);
					console.log('AllowHeader-->' + result.InterfaceResult.AllowHeader);
					console.log('\n');
				}
			});
			
		}
	});
    
	
    /*
     * Put/Get/Delete bucket lifecycle operations
     */
	obs.setBucketLifecycleConfiguration({
		Bucket : bucketName,
		Rules:[
				{ID:'delete obsoleted files',Prefix:'obsoleted/',Status:'Enabled',Expiration:{Days:10}},
				{ID:'delete temporary files',Prefix:'temporary/',Status:'Enabled',Expiration:{Date:'2017-12-31T00:00:00Z'}},
				{ID:'delete temp files',Prefix:'temp/',Status:'Enabled',NoncurrentVersionExpiration:{NoncurrentDays : 10}}
		]
	}, (err, result) => {
		if(!err && result.CommonMsg.Status < 300){
			console.log('Set bucket lifecyle finished.\n');
			obs.getBucketLifecycleConfiguration({
				Bucket : bucketName
			}, (err, result) => {
				if(!err && result.CommonMsg.Status < 300){
					console.log('Get bucket lifecyle:');
					for(let i=0;i<result.InterfaceResult.Rules.length;i++){
						console.log('Rule[' + i + ']:');
						console.log('ID-->' + result.InterfaceResult.Rules[i]['ID']);
						console.log('Prefix-->' + result.InterfaceResult.Rules[i]['Prefix']);
						console.log('Status-->' + result.InterfaceResult.Rules[i]['Status']);
						if(result.InterfaceResult.Rules[i]['Expiration']){
							console.log('Expiration[Date]-->' + result.InterfaceResult.Rules[i]['Expiration']['Date']);
							console.log('Expiration[Days]-->' + result.InterfaceResult.Rules[i]['Expiration']['Days']);
						}
						if(result.InterfaceResult.Rules[i]['NoncurrentVersionExpiration']){
							console.log('NoncurrentVersionExpiration[Days]-->' + result.InterfaceResult.Rules[i]['NoncurrentVersionExpiration']['NoncurrentDays']);
						}
					}
					console.log('\n');
					
					obs.deleteBucketLifecycleConfiguration({
						Bucket : bucketName
					}, (err, result) => {
						if(!err && result.CommonMsg.Status < 300){
							console.log('Delete bucket lifecyle finished.\n');
						}
					});
				}
			});
		}
	});
	
	
	
    /*
     * Put/Get/Delete bucket website operations
     */
	obs.setBucketWebsiteConfiguration({
		Bucket : bucketName,
		IndexDocument:{Suffix:'index.html'},
		ErrorDocument:{Key:'error.html'}
	}, (err, result) => {
		if(!err && result.CommonMsg.Status < 300){
			console.log('Set bucket website finished.\n');
			obs.getBucketWebsiteConfiguration({
				Bucket : bucketName
			}, (err, result) => {
				if(!err && result.CommonMsg.Status < 300){
					console.log('Get bucket website:');
					console.log('\tIndexDocument[Suffix]-->' + result.InterfaceResult.IndexDocument['Suffix']);
					console.log('\tErrorDocument[Key]-->' + result.InterfaceResult.IndexDocument['Key']);
					console.log('\n');
					obs.deleteBucketWebsiteConfiguration({
						Bucket : bucketName
					}, (err, result) => {
						if(!err && result.CommonMsg.Status < 300){
							console.log('Delete bucket website finished.\n');
							console.log('\n');
						}
					});
				}
			});
		}
	});
	
    /*
     * Put/Get/Delete bucket tagging operations
     */
	obs.setBucketTagging({
		Bucket : bucketName,
		TagSet : {
			'Tag' :[{'Key':'key1','Value':'value1'}, {'Key':'key2', 'Value':'value2'}]
		}
	}, (err, result) => {
		if(!err && result.CommonMsg.Status < 300){
			console.log('Set bucket tagging finished.\n');
			obs.getBucketTagging({
				Bucket : bucketName
			}, (err, result)=>{
				if(!err && result.CommonMsg.Status < 300){
					console.log('Get bucket tagging:');
					result.InterfaceResult.TagSet.Tag.forEach(function(tag){
						console.log('Tag-->' + tag.Key + ':' + tag.Value);
					});
					console.log('\n');
					obs.deleteBucketTagging({
						Bucket : bucketName
					}, (err, result) => {
						if(!err && result.CommonMsg.Status < 300){
							console.log('Delete bucket tagging finished.\n');
						}
					});
				}
			});
		}
	});
	
});


var process = require('process');
var deleteFinished = false;

process.on('beforeExit', (code) => {
	if(!deleteFinished){
		/*
		 * Delete bucket operation
		 */
		obs.deleteBucket({
			Bucket : bucketName
		}, (err, result) => {
			if(!err && result.CommonMsg.Status < 300){
				console.log('Delete bucket finished.\n');
			}else{
				console.log('Delete bucket failed.\n');
			}
			obs.close();
		});
		deleteFinished = true;
	}
});


