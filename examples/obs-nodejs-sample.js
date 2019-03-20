

'use strict';

var ObsClient;
try{
	ObsClient = require('./lib/obs');
}catch(e){
	ObsClient = require('../lib/obs');//sample env
}

var process = require('process');

/*
 * Catch uncatught exception
 */
process.on('uncaughtException', function (err) {
	console.log(err);
	process.exit(1);
});

/*
 * Initialize a obs client instance with your account for accessing OBS
 */
var obs = new ObsClient({
	access_key_id: '*** Provide your Access Key ***',
	secret_access_key: '*** Provide your Secret Key ***',
	server : 'yourdomainname'
});

/*
 * Initialize obs sdk log
 */
obs.InitLog({
	file_full_path:'./logs/OBS-SDK.log',
	max_log_size: 10 * 1024 * 1024, //10MB
	backups:10,
	level:'warn',
	log_to_console:true
});

//create bucket
function createBucket(){
	obs.CreateBucket({
		Bucket : 'bucket001',
		ACL : obs.enums.AclPrivate,
		StorageClass : obs.enums.StorageClassCold,
		Location : 'region3'
	}, function(err, result){
		if(err){
			console.error('err:' + err);
			return;
		}
		console.log('CommonMsg:');
		console.log('Status-->' + result.CommonMsg.Status);
		console.log('Code-->' + result.CommonMsg.Code);
		console.log('Message-->' + result.CommonMsg.Message);
		console.log('HostId-->' + result.CommonMsg.HostId);
	});
}

//list buckets
function listBuckets(){
	obs.ListBuckets(function(err, result){
		if(err){
			console.error('err:' + err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult){
				console.log('RequestId-->' + result.InterfaceResult.RequestId);
				console.log('Owner:');
				console.log('ID-->' + result.InterfaceResult.Owner.ID);
				console.log('Name-->' + result.InterfaceResult.Owner.Name);
				console.log('Buckets:');
				for(let i=0;i<result.InterfaceResult.Buckets.Bucket.length;i++){
					console.log('Bucket[' + i + ']:');
					console.log('BucketName-->' + result.InterfaceResult.Buckets.Bucket[i].BucketName);
					console.log('CreationDate-->' + result.InterfaceResult.Buckets.Bucket[i].CreationDate);
				}
			}
		}
	});
}

//head bucket
function headBucket(){
	obs.HeadBucket({
		Bucket:'bucket001',
	}, function(err, result){
		if(err){
			console.error('err:' + err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
		}
	});
}


//get bucket metadata
function getBucketMetadata(){
	obs.GetBucketMetadata({
		Bucket:'bucket001',
		Origin:'www.example.com',
		RequestHeader : 'header1'
	}, function(err, result){
		if(err){
			console.error('err:' + err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult){
				console.log('RequestId-->' + result.InterfaceResult.RequestId);
				console.log('StorageClass-->' + result.InterfaceResult.StorageClass);
				console.log('AllowOrigin-->' + result.InterfaceResult.AllowOrigin);
				console.log('MaxAgeSeconds-->' + result.InterfaceResult.MaxAgeSeconds);
				console.log('ExposeHeader-->' + result.InterfaceResult.ExposeHeader);
				console.log('AllowMethod-->' + result.InterfaceResult.AllowMethod);
				console.log('AllowHeader-->' + result.InterfaceResult.AllowHeader);
			}
		}
	});
}

//delete bucket
function deleteBucket(){
	obs.DeleteBucket({
		Bucket:'bucket001',
	}, function(err, result){
		if(err){
			console.error('err:' + err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
		}
	});
}

//list objects in bucket
function listObjects(){
	obs.ListObjects({
		Bucket: 'bucket001',
		MaxKeys: 10,
	}, function(err, result){
		if(err){
			console.error('err:' + err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
			if(result.InterfaceResult){
				console.log('RequestId-->' + result.InterfaceResult.RequestId);
				console.log('Bucket-->' + result.InterfaceResult.Bucket);
				console.log('Delimiter-->' + result.InterfaceResult.Delimiter);
				console.log('Marker-->' + result.InterfaceResult.Marker);
				console.log('NextMarker-->' + result.InterfaceResult.NextMarker);
				console.log('MaxKeys-->' + result.InterfaceResult.MaxKeys);
				console.log('IsTruncated-->' + result.InterfaceResult.IsTruncated);
				console.log('Contents:');
				for(let j=0;j<result.InterfaceResult.Contents.length;j++){
					console.log('Contents[' + j +  ']:');
					console.log('Key-->' + result.InterfaceResult.Contents[j]['Key']);
					console.log('LastModified-->' + result.InterfaceResult.Contents[j]['LastModified']);
					console.log('ETag-->' + result.InterfaceResult.Contents[j]['ETag']);
					console.log('Size-->' + result.InterfaceResult.Contents[j]['Size']);
					console.log('Owner[ID]-->' + result.InterfaceResult.Contents[j]['Owner']['ID']);
					console.log('Owner[Name]-->' + result.InterfaceResult.Contents[j]['Owner']['Name']);
					console.log('StorageClass-->' + result.InterfaceResult.Contents[j]['StorageClass']);
				}
				console.log('CommonPrefixes:');
				for(let i=0;i<result.InterfaceResult.CommonPrefixes.length;i++){
					console.log('CommonPrefix[' + i +  ']:');
					console.log('Prefix-->' + result.InterfaceResult.CommonPrefixes[i]['Prefix']);
				}
			}
		}
	});
}


//list versions in bucket
function listVersions(){
	obs.ListVersions({
		Bucket:'bucket001',
		MaxKeys:10,	
	}, function(err, result){
		if(err){
			console.error('err:' + err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult){
				console.log('RequestId-->' + result.InterfaceResult.RequestId);
				console.log('Bucket-->' + result.InterfaceResult.Bucket);
				console.log('Prefix-->' + result.InterfaceResult.Prefix);
				console.log('KeyMarker-->' + result.InterfaceResult.KeyMarker);
				console.log('VersionIdMarker-->' + result.InterfaceResult.VersionIdMarker);
				console.log('NextKeyMarker-->' + result.InterfaceResult.NextKeyMarker);
				console.log('NextVersionIdMarker-->' + result.InterfaceResult.NextVersionIdMarker);
				console.log('MaxKeys-->' + result.InterfaceResult.MaxKeys);
				console.log('IsTruncated-->' + result.InterfaceResult.IsTruncated);
				console.log('Versions:');
				for(let j=0;j<result.InterfaceResult.Versions.length;j++){
					console.log('Version[' + j +  ']:');
					console.log('Key-->' + result.InterfaceResult.Versions[j]['Key']);
					console.log('VersionId-->' + result.InterfaceResult.Versions[j]['VersionId']);
					console.log('IsLatest-->' + result.InterfaceResult.Versions[j]['IsLatest']);
					console.log('LastModified-->' + result.InterfaceResult.Versions[j]['LastModified']);
					console.log('ETag-->' + result.InterfaceResult.Versions[j]['ETag']);
					console.log('Size-->' + result.InterfaceResult.Versions[j]['Size']);
					console.log('Owner[ID]-->' + result.InterfaceResult.Versions[j]['Owner']['ID']);
					console.log('Owner[Name]-->' + result.InterfaceResult.Versions[j]['Owner']['Name']);
					console.log('StorageClass-->' + result.InterfaceResult.Versions[j]['StorageClass']);
				}
				console.log('DeleteMarkers:');
				for(let i=0;i<result.InterfaceResult.DeleteMarkers.length;i++){
					console.log('DeleteMarker[' + i +  ']:');
					console.log('Key-->' + result.InterfaceResult.DeleteMarkers[i]['Key']);
					console.log('VersionId-->' + result.InterfaceResult.DeleteMarkers[i]['VersionId']);
					console.log('IsLatest-->' + result.InterfaceResult.DeleteMarkers[i]['IsLatest']);
					console.log('LastModified-->' + result.InterfaceResult.DeleteMarkers[i]['LastModified']);
					console.log('Owner[ID]-->' + result.InterfaceResult.DeleteMarkers[i]['Owner']['ID']);
					console.log('Owner[Name]-->' + result.InterfaceResult.DeleteMarkers[i]['Owner']['Name']);
				}
				console.log('CommonPrefixes:');
				if (result.InterfaceResult.CommonPrefixes) {
					for(let i=0;i<result.InterfaceResult.CommonPrefixes.length;i++){
						console.log('CommonPrefix[' + i +  ']:');
						console.log('Prefix-->' + result.InterfaceResult.CommonPrefixes[i]['Prefix']);
					}
				}
			}
		}
	});
}

//get bucket location
function getBucketLocation(){
	obs.GetBucketLocation({
		Bucket:'bucket001',
	}, function(err, result){
		if(err){
			console.error('err:' + err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult){
				console.log('RequestId-->' + result.InterfaceResult.RequestId);
				console.log('Location-->' + result.InterfaceResult.Location);
			}
		}
	});
}

//get bucket storage information
function getBucketStorageInfo(){
	obs.GetBucketStorageInfo({
		Bucket:'bucket001',
	}, function(err, result){
		if(err){
			console.error('err:' + err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult){
				console.log('RequestId-->' + result.InterfaceResult.RequestId);
				console.log('Size-->' + result.InterfaceResult.Size);
				console.log('ObjectNumber-->' + result.InterfaceResult.ObjectNumber);
			}
		}
	});
}

//set bucket storage information
function setBucketQuota(){
	obs.SetBucketQuota({
		Bucket:'bucket001',
		StorageQuota:1048576000,
	}, function(err, result){
		if(err){
			console.error('err:' + err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult){
				console.log('RequestId-->' + result.InterfaceResult.RequestId);
			}
		}
	});
}

//get bucket quota
function getBucketQuota(){
	obs.GetBucketQuota({
		Bucket:'bucket001',
	},function(err, result){
		if(err){
			console.error('err:' + err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult){
				console.log('RequestId-->' + result.InterfaceResult.RequestId);
				console.log('StorageQuota-->' + result.InterfaceResult.StorageQuota);
			}
		}
	});
}

//set bucket acl
function setBucketAcl(){
	obs.SetBucketAcl({
		Bucket:'bucket001',
		Owner:{ID:'ownerid',Name:'ownername'},
		Grants:{
			Grant:[
				{Grantee:{Type:obs.enums.GranteeUser,ID:'userid'},Permission:obs.enums.PermissionRead},
			    {Grantee:{Type:obs.enums.GranteeUser,ID:'userid'},Permission:obs.enums.PermissionWrite},
		        {Grantee:{Type:obs.enums.GranteeGroup,URI:obs.enums.GroupLogDelivery},Permission:obs.enums.PermissionWrite},
		        {Grantee:{Type:obs.enums.GranteeGroup,URI:obs.enums.GroupLogDelivery},Permission:obs.enums.PermissionReadAcp}
		    ]
		}
	}, function(err,result){
		if(err){
			console.error('err:' + err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResultz){
				console.log('RequestId-->' + result.InterfaceResult.RequestId);
			}
		}
	});
}

//get bucket acl
function getBucketAcl(){
	obs.GetBucketAcl({
		Bucket:'bucket001',
	}, function(err, result){
		if(err){
			console.error('err:' + err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult){
				console.log('RequestId-->' + result.InterfaceResult.RequestId);
				console.log('Owner[ID]-->' + result.InterfaceResult.Owner.ID);
				console.log('Owner[Name]-->' + result.InterfaceResult.Owner.Name);
				console.log('Grants:');
				for(let i=0;i<result.InterfaceResult.Grants.Grant.length;i++){
					console.log('Grant[' + i + ']:');
					console.log('Grantee[ID]-->' + result.InterfaceResult.Grants.Grant[i]['Grantee']['ID']);
					console.log('Grantee[Name]-->' + result.InterfaceResult.Grants.Grant[i]['Grantee']['Name']);
					console.log('Grantee[URI]-->' + result.InterfaceResult.Grants.Grant[i]['Grantee']['URI']);
					console.log('Permission-->' + result.InterfaceResult.Grants.Grant[i]['Permission']);
				}
			}
		}
	});
}

//set bucket logging
function setBucketLoggingConfiguration(){
	obs.SetBucketLoggingConfiguration({
		Bucket:'bucket001',
		LoggingEnabled:{
			TargetBucket:'bucket003',
			TargetPrefix:'bucket.log',
			TargetGrants:{
				Grant:[{'Grantee':{'Type':obs.enums.GranteeUser,'ID':'userid',},'Permission':obs.enums.PermissionWrite},
				         {'Grantee':{'Type':obs.enums.GranteeGroup,'URI':obs.enums.GroupAllUsers,},'Permission':obs.enums.PermissionRead},],
			},
		}
	}, function(err, result){
		if(err){
			console.error('err:' + err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult){
				console.log('RequestId-->' + result.InterfaceResult.RequestId);
			}
		}
	});
}

//get bucket logging
function getBucketLoggingConfiguration(){
	obs.GetBucketLoggingConfiguration({
		Bucket:'bucket001',
	}, function(err, result){
		if(err){
			console.error('err:' + err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult){
				console.log('RequestId-->' + result.InterfaceResult.RequestId);
				console.log('LoggingEnabled:');
				console.log('TargetBucket-->' + result.InterfaceResult.LoggingEnabled.TargetBucket);
				console.log('TargetPrefix-->' + result.InterfaceResult.LoggingEnabled.TargetPrefix);
				console.log('InterfaceResult[TargetGrants]:');
				for(let i=0;i<result.InterfaceResult.LoggingEnabled.TargetGrants.Grant.length;i++){
					console.log('Grant[' + i + ']:');
					console.log('Grantee[ID]-->' + result.InterfaceResult.LoggingEnabled.TargetGrants.Grant[i]['Grantee']['ID']);
					console.log('Grantee[Name]-->' + result.InterfaceResult.LoggingEnabled.TargetGrants.Grant[i]['Grantee']['Name']);
					console.log('Grantee[URI]-->' + result.InterfaceResult.LoggingEnabled.TargetGrants.Grant[i]['Grantee']['URI']);
					console.log('Permission-->' + result.InterfaceResult.LoggingEnabled.TargetGrants.Grant[i]['Permission']);
				}
			}
		}
	});
}

//set bucket policy
function setBucketPolicy(){
	obs.SetBucketPolicy({
		Bucket:'bucket001',
		Policy:'{"Version":"2008-10-17","Id": "Policy1375342051334","Statement": [{"Sid": "Stmt1375240018061","Action": ["s3:GetBucketPolicy"],"Effect": "Allow","Resource": "arn:aws:s3:::bucket001","Principal": { "CanonicalUser": "domainiddomainiddomainiddo000100" } }]}',
	}, function(err, result){
		if(err){
			console.error('err:' + err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult){
				console.log('RequestId-->' + result.InterfaceResult.RequestId);
				console.log('Policy-->' + result.InterfaceResult.Policy);
			}
		}
	});
}

//get bucket policy
function getBucketPolicy(){
	obs.GetBucketPolicy({
		Bucket:'bucket001',
	}, function(err, result){
		if(err){
			console.error('err:' + err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult){
				console.log('RequestId-->' + result.InterfaceResult.RequestId);
				console.log('Policy-->' + result.InterfaceResult.Policy);
			}
		}
	});
}

//delete bucket policy
function deleteBucketPolicy(){
	obs.DeleteBucketPolicy({
		Bucket:'bucket001',
	}, function(err, result){
		if(err){
			console.error('err:' + err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult){
				console.log('RequestId-->' + result.InterfaceResult.RequestId);
			}
		}
	});
}

//set bucket lifecycle
function setBucketLifecycleConfiguration(){
	obs.SetBucketLifecycleConfiguration({
		Bucket: 'bucket001',
		Rules:[
			{ID:'rule1',Prefix:'prefix1',Status:'Enabled',Expiration:{Days: 100}, 
				NoncurrentVersionExpiration:{NoncurrentDays : 100}, NoncurrentVersionTransitions:[{StorageClass:obs.enums.StorageClassCold,NoncurrentDays:30}]},
			{ID:'rule2',Prefix:'prefix2',Status:'Enabled',
				Expiration:{Date: '2018-12-31T00:00:00Z'}, Transitions:[{StorageClass:obs.enums.StorageClassCold, Date:'2018-10-31T00:00:00Z'}]}
		]
	}, function(err,result){
		if(err){
			console.error('err:' + err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult){
				console.log('RequestId-->' + result.InterfaceResult.RequestId);
			}
		}
	});
}

//get bucket lifecycle
function getBucketLifecycleConfiguration(){
	obs.GetBucketLifecycleConfiguration({
		Bucket:'bucket001',
	}, function(err,result){
		if(err){
			console.error('err:' + err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult){
				console.log('RequestId-->' + result.InterfaceResult.RequestId);
				console.log('Rules:');
				for(let i=0;i<result.InterfaceResult.Rules.length;i++){
					console.log('Rule[' + i + ']:');
					console.log('ID-->' + result.InterfaceResult.Rules[i]['ID']);
					console.log('Prefix-->' + result.InterfaceResult.Rules[i]['Prefix']);
					console.log('Status-->' + result.InterfaceResult.Rules[i]['Status']);
					for(let j=0;j<result.InterfaceResult.Rules[i]['Transitions'].length;j++){
						console.log('Transition[' + j + ']:');
						console.log('Transition[StorageClass]-->' + result.InterfaceResult.Rules[i]['Transitions'][j]['StorageClass']);
						console.log('Transition[Date]-->' + result.InterfaceResult.Rules[i]['Transitions'][j]['Date']);
						console.log('Transition[Days]-->' + result.InterfaceResult.Rules[i]['Transitions'][j]['Days']);
					}
					console.log('Expiration[Date]-->' + result.InterfaceResult.Rules[i]['Expiration']['Date']);
					console.log('Expiration[Days]-->' + result.InterfaceResult.Rules[i]['Expiration']['Days']);
					for(let j=0;j<result.InterfaceResult.Rules[i]['NoncurrentVersionTransitions'].length;j++){
						console.log('NoncurrentVersionTransition[' + j + ']:');
						console.log('NoncurrentVersionTransition[StorageClass]-->' + result.InterfaceResult.Rules[i]['NoncurrentVersionTransitions'][j]['StorageClass']);
						console.log('NoncurrentVersionTransition[NoncurrentDays]-->' + result.InterfaceResult.Rules[i]['NoncurrentVersionTransitions'][j]['NoncurrentDays']);
					}
					console.log('NoncurrentVersionExpiration[NoncurrentDays]-->' + result.InterfaceResult.Rules[i]['NoncurrentVersionExpiration']['NoncurrentDays']);
				}
			}
		}
	});
}

//delete bucket lifecycle
function deleteBucketLifecycleConfiguration(){
	obs.DeleteBucketLifecycleConfiguration({
		Bucket:'bucket001',
	}, function(err, result){
		if(err){
			console.error('err:' + err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult){
				console.log('RequestId-->' + result.InterfaceResult.RequestId);
			}
		}
	});
}

//set bucket website configuration
function setBucketWebsiteConfiguration(){
	obs.SetBucketWebsiteConfiguration({
		Bucket:'bucket001',
		RedirectAllRequestsTo : {HostName : 'www.example.com', Protocol : 'https'}
//		IndexDocument:{'Suffix':'index.html'},
//		ErrorDocument:{'Key':'error.html'},
//		RoutingRules:{
//			'RoutingRule':[{'Condition':{'HttpErrorCodeReturnedEquals':'404'},'Redirect':{'Protocol':'http','ReplaceKeyWith':'NotFound.html'}},
//			               {'Condition':{'HttpErrorCodeReturnedEquals':'404'},'Redirect':{'Protocol':'http','ReplaceKeyWith':'test.html'}}]}
	}, function(err, result){
		if(err){
			console.error('err:' + err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult){
				console.log('RequestId-->' + result.InterfaceResult.RequestId);
			}
		}
	});
}

//get bucket website configuration
function getBucketWebsiteConfiguration(){
	obs.GetBucketWebsiteConfiguration({
		Bucket:'bucket001',
	}, function(err, result){
		if(err){
			console.error('err:' + err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult){
				console.log('RequestId-->' + result.InterfaceResult.RequestId);
				console.log('RedirectAllRequestsTo:');
				console.log('HostName-->' + result.InterfaceResult.RedirectAllRequestsTo['HostName']);
				console.log('Protocol-->' + result.InterfaceResult.RedirectAllRequestsTo['Protocol']);
				console.log('IndexDocument[Suffix]-->' + result.InterfaceResult.IndexDocument['Suffix']);
				console.log('ErrorDocument[Key]-->' + result.InterfaceResult.ErrorDocument['Key']);
				console.log('RoutingRules:');
				for(let i=0;i<result.InterfaceResult.RoutingRules.RoutingRule.length;i++){
					console.log('RoutingRule[' + i + ']:');
					let RoutingRule = result.InterfaceResult.RoutingRules.RoutingRule[i];
					console.log('Condition[HttpErrorCodeReturnedEquals]-->' + RoutingRule['Condition']['HttpErrorCodeReturnedEquals']);
					console.log('Condition[KeyPrefixEquals]-->' + RoutingRule['Condition']['KeyPrefixEquals']);
					console.log('Redirect[HostName]-->' + RoutingRule['Redirect']['HostName']);
					console.log('Redirect[HttpRedirectCode]-->' + RoutingRule['Redirect']['HttpRedirectCode']);
					console.log('Redirect[Protocol]-->' + RoutingRule['Redirect']['Protocol']);
					console.log('Redirect[ReplaceKeyPrefixWith]-->' + RoutingRule['Redirect']['ReplaceKeyPrefixWith']);
					console.log('Redirect[ReplaceKeyWith]-->' + RoutingRule['Redirect']['ReplaceKeyWith']);
				}
			}
		}
	});
}

//delete bucket website configuration
function deleteBucketWebsiteConfiguration(){
	obs.DeleteBucketWebsiteConfiguration({
		Bucket:'bucket001',
	}, function(err, result){
		if(err){
			console.error('err:' + err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult){
				console.log('RequestId-->' + result.InterfaceResult.RequestId);
			}
		}
	});
}

//set bucket versioning
function setBucketVersioningConfiguration(){
	obs.SetBucketVersioningConfiguration({
		Bucket:'bucket001',
		VersionStatus:'Enabled',
	}, function(err, result){
		if(err){
			console.error('err:' + err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult){
				console.log('RequestId-->' + result.InterfaceResult.RequestId);
			}
		}
	});
}

//get bucket versioning
function getBucketVersioningConfiguration(){
	obs.GetBucketVersioningConfiguration({
		Bucket:'bucket001',
	}, function(err, result){
		if(err){
			console.error('err:' + err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult){
				console.log('RequestId-->' + result.InterfaceResult.RequestId);
				console.log('VersionStatus-->' + result.InterfaceResult.VersionStatus);
			}
		}
	});
}

//set bucket cors
function setBucketCors(){
	obs.SetBucketCors({
		Bucket:'bucket001',
		CorsRule:[
		    {
		    	ID:'rule1',
		    	AllowedMethod:['PUT','POST','GET','DELETE','HEAD'],
		    	AllowedOrigin:['obs.hostname','obs.hostname1'],
		    	AllowedHeader:['obs-header-1'],
		    	MaxAgeSeconds:60
			},
			{
				ID:'rule2',
				AllowedMethod:['PUT','POST','GET'],
				AllowedOrigin:['obs.hostname','obs.hostname1'],
				AllowedHeader:['header-1','header-2'],
				MaxAgeSeconds:50
			}
		]
	}, function(err, result){
		if(err){
			console.log('err:' + err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult){
				console.log('RequestId-->' + result.InterfaceResult.RequestId);
			}
		}
	});
}

//get bucket cors
function getBucketCors(){
	obs.GetBucketCors({
		'Bucket':'bucket001',
	}, function(err, result){
		if(err){
			console.log('err:' + err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult){
				console.log('RequestId-->' + result.InterfaceResult.RequestId);
				for(let k=0;k<result.InterfaceResult.CorsRule.length;k++){
					console.log('CorsRule[',k,']');
					console.log('CorsRule[ID]-->' + result.InterfaceResult.CorsRule[k]['ID']);
					console.log('CorsRule[MaxAgeSeconds]-->' + result.InterfaceResult.CorsRule[k]['MaxAgeSeconds']);
					for (let i=0;i<result.InterfaceResult.CorsRule[k]['AllowedMethod'].length;i++){
						console.log('CorsRule[AllowedMethod][' , i ,']-->'+result.InterfaceResult.CorsRule[k]['AllowedMethod'][i]);
					}
					for(let i=0;i<result.InterfaceResult.CorsRule[k]['AllowedOrigin'].length;i++){
						console.log('CorsRule[AllowedOrigin][',i ,']-->'+result.InterfaceResult.CorsRule[k]['AllowedOrigin'][i]);
					}
					for(let i=0;i<result.InterfaceResult.CorsRule[k]['AllowedHeader'].length;i++){
						console.log('CorsRule[AllowedHeader]',i,']-->'+result.InterfaceResult.CorsRule[k]['AllowedHeader'][i]);
					}
					for(let i=0;i<result.InterfaceResult.CorsRule[k]['ExposeHeader'].length;i++){
						console.log('CorsRule[ExposeHeader][',i ,']-->'+result.InterfaceResult.CorsRule[k]['ExposeHeader'][i]);
					}	
				}
			}
		}
	});
}

//delete bucket cors
function deleteBucketCors(){
	obs.DeleteBucketCors({
		'Bucket':'bucket001',
	}, function(err,result){
		if(err){
			console.log('err:'+err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult){
				console.log('RequestId-->' + result.InterfaceResult.RequestId);			
			}
		}
	});
}

//OPTIONS bucket
function optionsBucket(){
	obs.OptionsBucket({
		'Bucket':'bucket001',
		'Origin':'obs.hostname',
		'AccessControlRequestMethods':['POST','PUT'],
	}, function(err, result){
		if(err){
			console.log('err:' + err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult){
				console.log('RequestId-->' + result.InterfaceResult.RequestId);	
				console.log('AllowOrigin-->' + result.InterfaceResult.AllowOrigin);	
				console.log('AllowHeader-->' + result.InterfaceResult.AllowHeader);	
				console.log('AllowMethod-->' + result.InterfaceResult.AllowMethod);	
				console.log('ExposeHeader-->' + result.InterfaceResult.ExposeHeader);	
				console.log('MaxAgeSeconds-->' + result.InterfaceResult.MaxAgeSeconds);		
			}
		}
	});
}

//set bucket tagging
function setBucketTagging(){
	obs.SetBucketTagging({
		'Bucket' : 'bucket001',
		'TagSet' : {
			'Tag' :[{'Key':'testKey1','Value':'testValue1'}, {'Key':'testKey2', 'Value':'testValue2'}]
		}
	},function(err,result){
		if(err){
			console.log('err:' + err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult){
				console.log('RequestId-->' + result.InterfaceResult.RequestId);	
			}
		}
	});
}

//get bucket tagging
function getBucketTagging(){
	obs.GetBucketTagging({
		'Bucket' : 'bucket001',
	},function(err,result){
		if(err){
			console.error('err:' + err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult){
				console.log('RequestId-->' + result.InterfaceResult.RequestId);	
				result.InterfaceResult.TagSet.Tag.forEach(function(tag){
					console.log('Tag-->' + tag.Key + ':' + tag.Value);
				});
			}
		}
	});
}

//delete bucket tagging
function deleteBucketTagging(){
	obs.DeleteBucketTagging({
		'Bucket' : 'bucket001',
	},function(err,result){
		if(err){
			console.log('err:' + err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult){
				console.log('RequestId-->' + result.InterfaceResult.RequestId);	
			}
		}
	});
}

//set bucket notification
function setBucketNotification(){
	obs.SetBucketNotification({
		'Bucket' : 'bucket001',
		'TopicConfigurations' : [
			{
				'ID' : '001',
				'Topic' : 'urn:smn:region3:35667523534:topic1',
				'Event' : ['s3:ObjectCreated:*'],
				'Filter' : {
					'FilterRule' :[{'Name' : 'prefix', 'Value': 'smn'}, {'Name' : 'suffix', 'Value': '.jpg'}]
				}
			}
		]
	},function(err,result){
		if(err){
			console.log('err:' + err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult){
				console.log('RequestId-->' + result.InterfaceResult.RequestId);	
			}
		}
	});
}

//get bucket notification
function getBucketNotification(){
	obs.GetBucketNotification({
		'Bucket' : 'bucket001',
	},function(err,result){
		if(err){
			console.error('err:' + err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult){
				console.log('RequestId-->' + result.InterfaceResult.RequestId);	
				if(result.InterfaceResult.TopicConfigurations){
					for(let j=0;j<result.InterfaceResult.TopicConfigurations.length;j++){
						console.log('TopicConfiguration[' + j + ']');
						console.log('ID-->' + result.InterfaceResult.TopicConfigurations[j].ID);
						console.log('Topic-->' + result.InterfaceResult.TopicConfigurations[j].Topic);
						console.log('Event-->' + result.InterfaceResult.TopicConfigurations[j].Event);
						if(result.InterfaceResult.TopicConfigurations[j].Filter){
							for(let i=0;i<result.InterfaceResult.TopicConfigurations[j].Filter.FilterRule.length;i++){
								console.log('FilterRule[' + i + '][Name]-->' + result.InterfaceResult.TopicConfigurations[j].Filter.FilterRule[i].Name);
								console.log('FilterRule[' + i + '][Value]-->' + result.InterfaceResult.TopicConfigurations[j].Filter.FilterRule[i].Value);
							}
						}
					}
				}
			}
		}
	});
}

//set bucket storage policy
function setBucketStoragePolicy(){
	obs.SetBucketStoragePolicy({
		'Bucket' : 'bucket001',
		'StorageClass' : obs.enums.StorageClassWarm
	}, function(err, result){
		if(err){
			console.log('err:' + err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
		}
	});
}

//get bucket storage policy
function getBucketStoragePolicy(){
	obs.GetBucketStoragePolicy({
		'Bucket' : 'bucket001'
	}, function(err, result){
		if(err){
			console.log('err:' + err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
			if(result.InterfaceResult){
				console.log('StorageClass-->' + result.InterfaceResult.StorageClass);
			}
		}
	});
}

//delete object
function deleteObject(){
	obs.DeleteObject({
		'Bucket':'bucket001',
		'Key':'test.txt',
	}, function(err, result){
		if(err){
			console.log('err:' + err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult){
				console.log('RequestId-->' + result.InterfaceResult.RequestId);
				console.log('VersionId-->' + result.InterfaceResult.VersionId);
				console.log('DeleteMarker-->' + result.InterfaceResult.RequestId.DeleteMarker);	
			}
		}
	});
}

//batch delete objects
function deleteObjects(){
	obs.DeleteObjects({
		'Bucket':'bucket001',
		'Quiet':false,
		'Objects':[{'Key':'test.txt'},{'Key':'src/中文.txt'}]
	}, function(err, result){
		if(err){
			console.log('err:'+err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult){
				console.log('RequestId-->' + result.InterfaceResult.RequestId);
				console.log('Deleteds:');
				for(let i=0;i<result.InterfaceResult.Deleteds.length;i++){
					console.log('Deleted[' + i + ']:');
					console.log('Key-->'+result.InterfaceResult.Deleteds[i]['Key']);
					console.log('VersionId-->' + result.InterfaceResult.Deleteds[i]['VersionId']);
					console.log('DeleteMarker-->' + result.InterfaceResult.Deleteds[i]['DeleteMarker']);
					console.log('DeleteMarkerVersionId-->' + result.InterfaceResult.Deleteds[i]['DeleteMarkerVersionId']);
				}
				console.log('Errors:');
				for(let i=0;i<result.InterfaceResult.Errors.length;i++){
					console.log('Error[' + i + ']:');
					console.log('Key-->' + result.InterfaceResult.Errors[i]['Key']);
					console.log('VersionId-->' + result.InterfaceResult.Errors[i]['VersionId']);
					console.log('Code-->' + result.InterfaceResult.Errors[i]['Code']);
					console.log('Message-->' + result.InterfaceResult.Errors[i]['Message']);
				}
			}
		}
	});
}

//get object metadata
function getObjectMetadata(){
	obs.GetObjectMetadata({
		'Bucket':'bucket001',
		'Key':'test.txt',
	}, function(err, result){
		if(err){
			console.error('err:' + err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult){
				console.log('RequestId-->' + result.InterfaceResult.RequestId);
				console.log('ETag-->' + result.InterfaceResult.ETag);
				console.log('VersionId-->' + result.InterfaceResult.VersionId);
				console.log('ContentLength-->' + result.InterfaceResult.ContentLength);
				console.log('Expiration-->' + result.InterfaceResult.Expiration);
				console.log('LastModified-->' + result.InterfaceResult.LastModified);
				console.log('WebsiteRedirectLocation-->' + result.InterfaceResult.WebsiteRedirectLocation);
				console.log('StorageClass-->' + result.InterfaceResult.StorageClass);
			}
		}
	});
}

//set object acl
function setObjectAcl(){
	obs.SetObjectAcl({
		'Bucket':'bucket001',
		'Key':'test.txt',
		'Owner':{'ID':'ownerid','Name':'ownername'},
		'Grants':{'Grant':[{'Grantee':{'Type':obs.enums.GranteeUser,'ID':'userid',},'Permission':obs.enums.PermissionRead},
			               {'Grantee':{'Type':obs.enums.GranteeUser,'ID':'userid',},'Permission':obs.enums.PermissionWrite}]
		}
	}, function(err, result){
		if(err){
			console.error('err:' + err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult){
				console.log('RequestId-->' + result.InterfaceResult.RequestId);
				console.log('VersionId-->' + result.InterfaceResult.VersionId);
			}
		}
	});
}

//get object acl
function getObjectAcl(){
	obs.GetObjectAcl({
		'Bucket':'bucket001',
		'Key':'test.txt',
	}, function(err, result){
		if(err){
			console.log('err:' + err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult){
				console.log('RequestId-->' + result.InterfaceResult.RequestId);
				console.log('VersionId-->' + result.InterfaceResult.VersionId);
				console.log('Owner[ID]-->' + result.InterfaceResult.Owner.ID);
				console.log('Owner[Name]-->' + result.InterfaceResult.Owner.Name);
				console.log('Grants:');
				for(let i=0;i<result.InterfaceResult.Grants.Grant.length;i++){
					console.log('Grant[' + i + ']:');
					console.log('Grantee[ID]-->' + result.InterfaceResult.Grants.Grant[i]['Grantee']['ID']);
					console.log('Grantee[Name]-->' + result.InterfaceResult.Grants.Grant[i]['Grantee']['Name']);
					console.log('Grantee[URI]-->' + result.InterfaceResult.Grants.Grant[i]['Grantee']['URI']);
					console.log('Permission-->' + result.InterfaceResult.Grants.Grant[i]['Permission']);
				}
			}
		}
	});
}

//OPTIONS object
function optionsObject(){
	obs.OptionsObject({
		'Bucket':'bucket001',
		'Key':'test.txt',
		'Origin':'obs.hostname',
		'AccessControlRequestMethods':['PUT','GET', 'HEAD'],
	}, function(err, result){
		if(err){
			console.log('err:' + err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult){
				console.log('RequestId-->' + result.InterfaceResult.RequestId);	
				console.log('AllowOrigin-->' + result.InterfaceResult.AllowOrigin);	
				console.log('AllowHeader-->' + result.InterfaceResult.AllowHeader);	
				console.log('AllowMethod-->' + result.InterfaceResult.AllowMethod);	
				console.log('ExposeHeader-->' + result.InterfaceResult.ExposeHeader);	
				console.log('MaxAgeSeconds-->' + result.InterfaceResult.MaxAgeSeconds);		
			}
		}
	});
}

//restore cold object
function restoreObject(){
	obs.RestoreObject({
		Bucket :'bucket001',
		Key :'test.txt',
		Days : 1,
		Tier : obs.enums.RestoreTierExpedited
	}, function(err,result){
		if(err){
			console.error('err:' + err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult){
				console.log('RequestId-->' + result.InterfaceResult.RequestId);
				console.log('RestoreStatus-->' + result.InterfaceResult.RestoreStatus);
			}
		}
	});
}

//copy object
function copyObject(){
	obs.CopyObject({
		Bucket:'bucket001',
		Key:'test.txt',
		CopySource:'bucket003/test.txt',
		Metadata:{'key':'value'}
	}, function(err, result){
		if(err){
			console.error('err:' + err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult){
				console.log('RequestId-->' + result.InterfaceResult.RequestId);
				console.log('ETag-->' + result.InterfaceResult.ETag);
				console.log('VersionId-->' + result.InterfaceResult.VersionId);
				console.log('CopySourceVersionId-->' + result.InterfaceResult.CopySourceVersionId);
				console.log('LastModified-->' + result.InterfaceResult.LastModified);				
			}
		}
	});
}

//initiate multipart upload
function initiateMultipartUpload(){
	obs.InitiateMultipartUpload({
		Bucket:'bucket001',
		Key:'test.txt',
		ContentType : 'text/plain'
	}, function(err, result){
		if(err){
			console.log('err:'+err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult){
				console.log('RequestId-->' + result.InterfaceResult.RequestId);
				console.log('Bucket-->' + result.InterfaceResult.Bucket);
				console.log('Key-->' + result.InterfaceResult.Key);
				console.log('UploadId-->' + result.InterfaceResult.UploadId);
			}
		}
	});
}


//list multipart uploads
function listMultipartUploads(){
	obs.ListMultipartUploads({
		'Bucket':'bucket001',
		'MaxUploads':20,
	}, function(err, result){
		if(err){
			console.log('err:' + err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult){
				console.log('RequestId-->' + result.InterfaceResult.RequestId);
				console.log('Bucket-->' + result.InterfaceResult.Bucket);
				console.log('KeyMarker-->' + result.InterfaceResult.KeyMarker);
				console.log('UploadIdMarker-->' + result.InterfaceResult.UploadIdMarker);
				console.log('NextKeyMarker-->' + result.InterfaceResult.NextKeyMarker);
				console.log('Prefix-->' + result.InterfaceResult.Prefix);
				console.log('Delimiter-->' + result.InterfaceResult.Delimiter);
				console.log('NextUploadIdMarker-->' + result.InterfaceResult.NextUploadIdMarker);
				console.log('MaxUploads-->' + result.InterfaceResult.MaxUploads);
				console.log('IsTruncated-->' + result.InterfaceResult.IsTruncated);
				console.log('Upload：');
				for(let i=0;i<result.InterfaceResult.Uploads.length;i++){
					console.log('Uploads[' + i + ']');
					console.log('UploadId-->' + result.InterfaceResult.Uploads[i]['UploadId']);
					console.log('Key-->' + result.InterfaceResult.Uploads[i]['Key']);
					console.log('Initiated-->' + result.InterfaceResult.Uploads[i]['Initiated']);
					console.log('StorageClass-->' + result.InterfaceResult.Uploads[i]['StorageClass']);
					console.log('Owner[ID]-->' + result.InterfaceResult.Uploads[i]['Owner']['ID']);
					console.log('Owner[Name]-->' + result.InterfaceResult.Uploads[i]['Owner']['Name']);
					console.log('Initiator[ID]-->' + result.InterfaceResult.Uploads[i]['Initiator']['ID']);
					console.log('Initiator[Name]-->' + result.InterfaceResult.Uploads[i]['Initiator']['Name']);
				}
				console.log('CommonPrefixes：');
				for(let i=0;i<result.InterfaceResult.CommonPrefixes.length;i++){
					console.log('CommonPrefix[' + i +  ']:');
					console.log('Prefix-->' + result.InterfaceResult.CommonPrefixes[i]['Prefix']);
				}
			}
		}
	});
}

//abort multipart upload
function abortMultipartUpload(){
	obs.AbortMultipartUpload({
		'Bucket':'bucket001',
		'Key':'test.txt',
		'UploadId':'uploadid',
	}, function(err, result){
		if(err){
			console.log('err:' + err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult){
				console.log('RequestId-->' + result.InterfaceResult.RequestId);
			}
		}
	});
}


//copy part
function copyPart(){
	obs.CopyPart({
		'Bucket':'bucket001',
		'Key':'test.txt',
		'PartNumber':1,
		'UploadId':'uploadid',
		'CopySource':'bucket003/test.txt'
	}, function(err, result){
		if(err){
			console.log('err:' + err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult){
				console.log('RequestId-->' + result.InterfaceResult.RequestId);
				console.log('LastModified-->' + result.InterfaceResult.LastModified);
				console.log('ETag-->' + result.InterfaceResult.ETag);
			}
		}
	});
}

//list parts
function listParts(){
	obs.ListParts({
		'Bucket':'bucket001',
		'Key':'test.txt',
		'UploadId':'uploadid',
		'MaxParts':10,
	}, function(err, result){
		if(err){
			console.log('err:' + err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult){
				console.log('RequestId-->' + result.InterfaceResult.RequestId);
				console.log('Bucket-->' + result.InterfaceResult.Bucket);
				console.log('Key-->' + result.InterfaceResult.Key);
				console.log('UploadId-->' + result.InterfaceResult.UploadId);
				console.log('PartNumberMarker-->' + result.InterfaceResult.PartNumberMarker);
				console.log('NextPartNumberMarker-->' + result.InterfaceResult.NextPartNumberMarker);
				console.log('MaxParts-->' + result.InterfaceResult.MaxParts);
				console.log('IsTruncated-->' + result.InterfaceResult.IsTruncated);
				console.log('StorageClass-->' + result.InterfaceResult.StorageClass);
				console.log('Initiator[ID]-->' + result.InterfaceResult.Initiator['ID']);
				console.log('Initiator[Name]-->' + result.InterfaceResult.Initiator['Name']);
				console.log('Owner[ID]-->' + result.InterfaceResult.Owner['ID']);
				console.log('Owner[Name]-->' + result.InterfaceResult.Owner['Name']);
				console.log('Parts:');
				for(let i=0;i<result.InterfaceResult.Parts.length;i++){
					console.log('Part['+i+']:');
					console.log('PartNumber-->' + result.InterfaceResult.Parts[i]['PartNumber']);
					console.log('LastModified-->' + result.InterfaceResult.Parts[i]['LastModified']);
					console.log('ETag-->' + result.InterfaceResult.Parts[i]['ETag']);
					console.log('Size-->' + result.InterfaceResult.Parts[i]['Size']);
				}
			}
		}
	});
}

//upload object
function putObject(){
	obs.PutObject({
		'Bucket':'bucket001',
		'Key':'test.txt',
		'Metadata':{'key':'value'},
		'SourceFile' : '/temp/test.txt',
		'ContentType': 'text/plain'
	}, function(err, result){
		if(err){
			console.error('err:' + err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult){
				console.log('RequestId-->' + result.InterfaceResult.RequestId);
				console.log('ETag-->' + result.InterfaceResult.ETag);
				console.log('VersionId-->' + result.InterfaceResult.VersionId);
				console.log('StorageClass-->' + result.InterfaceResult.StorageClass);
			}
		}
	});
}

//upload part
function uploadPart(){
	obs.UploadPart({
		'Bucket':'bucket001',
		'Key':'test.txt',
		'PartNumber':1,
		'UploadId':'uploadid',
		'SourceFile': '/temp/test.txt',
	}, function(err, result){
		if(err){
			console.log('err:' + err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult){
				console.log('RequestId-->' + result.InterfaceResult.RequestId);
				console.log('ETag-->' + result.InterfaceResult.ETag);
			}
		}
	});
}

//merge parts
function completeMultipartUpload(){
	obs.CompleteMultipartUpload({
		'Bucket':'bucket001',
		'Key':'test.txt',
		'UploadId':'uploadid',
		'Parts':[{'PartNumber':1,'ETag':'etagvalue'}]
	}, function(err, result){
		if(err){
			console.log('err:' + err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult){
				console.log('RequestId-->' + result.InterfaceResult.RequestId);
				console.log('VersionId-->' + result.InterfaceResult.VersionId);
				console.log('Location-->' + result.InterfaceResult.Location);
				console.log('Bucket-->' + result.InterfaceResult.Bucket);
				console.log('Key-->' + result.InterfaceResult.Key);
				console.log('ETag-->' + result.InterfaceResult.ETag);
			}
		}
	});
}

//get object
function getObject(){
	obs.GetObject({
		'Bucket':'bucket001',
		'Key':'test.txt',
		'Range':'bytes=0-10',
		'SaveAsFile':'/temp/file.log'
	}, function(err,result){
		if(err){
			console.error('err:' + err);
		}else{
			console.log('CommonMsg:');
			console.log('Status-->' + result.CommonMsg.Status);
			console.log('Code-->' + result.CommonMsg.Code);
			console.log('Message-->' + result.CommonMsg.Message);
			console.log('HostId-->' + result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult){
				console.log('RequestId-->' + result.InterfaceResult.RequestId);
				console.log('ETag-->' + result.InterfaceResult.ETag);
				console.log('VersionId-->' + result.InterfaceResult.VersionId);
				console.log('ContentLength-->' + result.InterfaceResult.ContentLength);
				console.log('DeleteMarker-->' + result.InterfaceResult.DeleteMarker);
				console.log('LastModified-->' + result.InterfaceResult.LastModified);
				console.log('WebsiteRedirectLocation-->' + result.InterfaceResult.WebsiteRedirectLocation);
				console.log('StorageClass-->' + result.InterfaceResult.StorageClass);
				console.log('Restore-->' + result.InterfaceResult.Restore);	
				console.log('Metadata-->' + JSON.stringify(result.InterfaceResult.Metadata));	
			}
		}
	});
}


//===================桶操作=============================

//createBucket();
//listBuckets();
//headBucket();
//getBucketMetadata();
//deleteBucket();
//listObjects();
//listVersions();
//getBucketLocation();
//getBucketStorageInfo();
//setBucketQuota();
//getBucketQuota();
//setBucketAcl();
//getBucketAcl();
//setBucketLoggingConfiguration();
//getBucketLoggingConfiguration();
//setBucketPolicy();
//getBucketPolicy();
//deleteBucketPolicy();
//setBucketLifecycleConfiguration();
//getBucketLifecycleConfiguration();
//deleteBucketLifecycleConfiguration();
//setBucketWebsiteConfiguration();
//getBucketWebsiteConfiguration();
//deleteBucketWebsiteConfiguration();
//setBucketVersioningConfiguration();
//getBucketVersioningConfiguration();
//setBucketCors();
//getBucketCors();
//deleteBucketCors();
//optionsBucket();
//setBucketTagging();
//getBucketTagging();
//deleteBucketTagging();
//setBucketNotification();
//getBucketNotification();
//setBucketStoragePolicy();
//getBucketStoragePolicy();

//===================对象操作=============================
//putObject();
//getObject();
//copyObject();
//deleteObject();
//deleteObjects();
//getObjectMetadata();
//setObjectAcl();
//getObjectAcl();
//optionsObject();
//restoreObject();
//initiateMultipartUpload();
//listMultipartUploads();
//abortMultipartUpload();
//copyPart();
//listParts();
//uploadPart();
//completeMultipartUpload();

