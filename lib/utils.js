'use strict';

const crypto = require('crypto');
const fs = require('fs');
const events = require('events');
const http = require('http');
const https = require('https');
const xml2js = require('xml2js');
const urlLib = require('url');
const pathLib = require('path');
const streamLib = require('stream');

const obsModel = require('./obsModel');

const CONTENT_SHA256 = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
const defaultNs = 'http://s3.amazonaws.com/doc/2006-03-01/';
const OBS_SDK_VERSION = '2.1.4';

const mimeTypes = {
        '7z' : 'application/x-7z-compressed',
        'aac' : 'audio/x-aac',
        'ai' : 'application/postscript',
        'aif' : 'audio/x-aiff',
        'asc' : 'text/plain',
        'asf' : 'video/x-ms-asf',
        'atom' : 'application/atom+xml',
        'avi' : 'video/x-msvideo',
        'bmp' : 'image/bmp',
        'bz2' : 'application/x-bzip2',
        'cer' : 'application/pkix-cert',
        'crl' : 'application/pkix-crl',
        'crt' : 'application/x-x509-ca-cert',
        'css' : 'text/css',
        'csv' : 'text/csv',
        'cu' : 'application/cu-seeme',
        'deb' : 'application/x-debian-package',
        'doc' : 'application/msword',
        'docx' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'dvi' : 'application/x-dvi',
        'eot' : 'application/vnd.ms-fontobject',
        'eps' : 'application/postscript',
        'epub' : 'application/epub+zip',
        'etx' : 'text/x-setext',
        'flac' : 'audio/flac',
        'flv' : 'video/x-flv',
        'gif' : 'image/gif',
        'gz' : 'application/gzip',
        'htm' : 'text/html',
        'html' : 'text/html',
        'ico' : 'image/x-icon',
        'ics' : 'text/calendar',
        'ini' : 'text/plain',
        'iso' : 'application/x-iso9660-image',
        'jar' : 'application/java-archive',
        'jpe' : 'image/jpeg',
        'jpeg' : 'image/jpeg',
        'jpg' : 'image/jpeg',
        'js' : 'text/javascript',
        'json' : 'application/json',
        'latex' : 'application/x-latex',
        'log' : 'text/plain',
        'm4a' : 'audio/mp4',
        'm4v' : 'video/mp4',
        'mid' : 'audio/midi',
        'midi' : 'audio/midi',
        'mov' : 'video/quicktime',
        'mp3' : 'audio/mpeg',
        'mp4' : 'video/mp4',
        'mp4a' : 'audio/mp4',
        'mp4v' : 'video/mp4',
        'mpe' : 'video/mpeg',
        'mpeg' : 'video/mpeg',
        'mpg' : 'video/mpeg',
        'mpg4' : 'video/mp4',
        'oga' : 'audio/ogg',
        'ogg' : 'audio/ogg',
        'ogv' : 'video/ogg',
        'ogx' : 'application/ogg',
        'pbm' : 'image/x-portable-bitmap',
        'pdf' : 'application/pdf',
        'pgm' : 'image/x-portable-graymap',
        'png' : 'image/png',
        'pnm' : 'image/x-portable-anymap',
        'ppm' : 'image/x-portable-pixmap',
        'ppt' : 'application/vnd.ms-powerpoint',
        'pptx' : 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'ps' : 'application/postscript',
        'qt' : 'video/quicktime',
        'rar' : 'application/x-rar-compressed',
        'ras' : 'image/x-cmu-raster',
        'rss' : 'application/rss+xml',
        'rtf' : 'application/rtf',
        'sgm' : 'text/sgml',
        'sgml' : 'text/sgml',
        'svg' : 'image/svg+xml',
        'swf' : 'application/x-shockwave-flash',
        'tar' : 'application/x-tar',
        'tif' : 'image/tiff',
        'tiff' : 'image/tiff',
        'torrent' : 'application/x-bittorrent',
        'ttf' : 'application/x-font-ttf',
        'txt' : 'text/plain',
        'wav' : 'audio/x-wav',
        'webm' : 'video/webm',
        'wma' : 'audio/x-ms-wma',
        'wmv' : 'video/x-ms-wmv',
        'woff' : 'application/x-font-woff',
        'wsdl' : 'application/wsdl+xml',
        'xbm' : 'image/x-xbitmap',
        'xls' : 'application/vnd.ms-excel',
        'xlsx' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'xml' : 'application/xml',
        'xpm' : 'image/x-xpixmap',
        'xwd' : 'image/x-xwindowdump',
        'yaml' : 'text/yaml',
        'yml' : 'text/yaml',
        'zip' : 'application/zip',	
};


const allowedResourceParameterNames = [        
	'acl',
    'policy',
    'torrent',
    'logging',
    'location',
    'storageinfo',
    'quota',
    'storagepolicy',
    'requestpayment',
    'versions',
    'versioning',
    'versionid',
    'uploads',
    'uploadid',
    'partnumber',
    'website',
    'notification',
    'lifecycle',
    'deletebucket',
    'delete',
    'cors',
    'restore',
    'tagging',
    'response-content-type',
    'response-content-language',
    'response-expires',
    'response-cache-control',
    'response-content-disposition',
    'response-content-encoding',
    'x-image-process'
];


const allowedResponseHttpHeaderMetadataNames = [
        'content-type',
        'content-md5',
        'content-length',
        'content-language',
        'expires',
        'origin',
        'cache-control',
        'content-disposition',
        'content-encoding',
        'x-default-storage-class',
        'location',
        'date',
        'etag',
        'host',
        'last-modified',
        'content-range',
        'x-reserved',
        'access-control-allow-origin',
        'access-control-allow-headers',
        'access-control-max-age',
        'access-control-allow-methods',
        'access-control-expose-headers',
        'connection'
];

const commonHeaders = {
	'content-length' : 'ContentLength',
	'date' : 'Date',
	'x-amz-request-id' : 'RequestId',
	'x-amz-id-2' : 'Id2',
	'x-reserved' : 'Reserved'
};

function encodeURIWithSafe(str, safe){
	if(str.length === 0){
		return '';
	}
	safe = safe || ',:?&%';
	var ret = [];
	for(let i=0;i<str.length;i++){
		ret.push(safe.indexOf(str[i]) >=0 ? str[i] : encodeURIComponent(str[i]));
	}
	
	return ret.join('');
}

function headerTostring(obj){
	return JSON.stringify(obj);
}

function v2Auth(ak, sk, opt, log, methodName) {
	var method = opt['method'];
	var path = opt['uri'];
	var flag = 'x-amz-';

	var stringToSign = method + '\n';
	if('Content-MD5' in opt['headers']){
		stringToSign += opt['headers']['Content-MD5'];
	}
	stringToSign += '\n';
	var contentType = opt['headers']['content-type'] || '';
	stringToSign += contentType;
	stringToSign += '\n';
	if (!('x-amz-date' in opt['headers'])){
		stringToSign += opt['headers']['date'];
	}
	stringToSign += '\n';
	var amz = [];
	var i = 0;
	for(let key in opt['headers']){
		if (key.length > flag.length && key.slice(0,flag.length) === flag){
			amz[i] = key;
			i++;
		}
	}
	amz = amz.sort();
	for(let key in amz){
		stringToSign += amz[key] + ':' + opt['headers'][amz[key]] + '\n';
	}
	if(opt['urlPath'] !== ''){
		let _path = opt['urlPath'];
		if(_path[0] === '?'){
			_path = _path.slice(1);
		}
		let arrPath = _path.split('&');
		arrPath = arrPath.sort();
		
		let urlPath = '';
		for(let i in arrPath){
			let strOpt = arrPath[i];
			let listvar = strOpt.split('=');
			if(allowedResourceParameterNames.indexOf(listvar[0].toLowerCase()) >= 0){
				let sep = urlPath === '' ?  '?' : '&';
				urlPath += sep;
				if(listvar.length === 2){
					urlPath += listvar[0] + '=' + decodeURIComponent(listvar[1]);
				}else{
					urlPath += strOpt;
				}
			}
		}
		path += urlPath;
	}
	stringToSign += path;
	
	log.runLog('debug',methodName, 'stringToSign:' + stringToSign);
	opt['headers']['authorization'] = 'AWS ' + ak + ':' + crypto.createHmac('sha1', sk).update(stringToSign).digest('base64');
	return opt;
}

function parseObjectFromHeaders(sentAs, headers){
	var metadata = {};
	for(let key in headers){
		let k = String(key).toLowerCase();
		if(k.indexOf(sentAs) === 0){
			metadata[k.slice(sentAs.length)] = headers[key];
		}
	}
	return metadata;
}

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

function jsonToObject(model, obj, root){
	var opt = {};
	if(root !== null){
		buildObject(model, obj, root, opt);
	}else{
		for(let key in model){
			buildObject(model, obj, key, opt);
		}
	}
	return opt;
}

function isArray(obj){
	return Object.prototype.toString.call(obj) === '[object Array]';
}

function utcToLocaleString(utcDate){
	return utcDate ? new Date(Date.parse(utcDate)).toLocaleString() : '';
}

function makeObjFromXml(xml, bc){
	xml2js.parseString(xml, {explicitArray:false, ignoreAttrs:true}, function(err, result){
		if(err){
			bc(err, null);
		}else{
			bc(null, result);
		}
	});
}

function parseCommonHeaders(opt, headers){
	for(let key in commonHeaders){
		opt['InterfaceResult'][commonHeaders[key]] = headers[key];
	}
}

function contrustCommonMsg(opt, obj, headers){
	opt['InterfaceResult'] = {};
	parseCommonHeaders(opt, headers);
	for (let key in obj){
		if(obj[key]['location'] === 'header'){
			let sentAs = obj[key]['sentAs'] || key;
			if(obj[key]['type'] === 'object'){
				opt['InterfaceResult'][key] = parseObjectFromHeaders(sentAs, headers);
			}else{
				let val = null;
				if(sentAs in headers){
					val = headers[sentAs];
				}else if(sentAs.toLowerCase() in headers){
					val = headers[sentAs.toLowerCase()];
				}
				if(val !== null){
					opt['InterfaceResult'][key] = val;
				}
			}
		}
	}
}

function getRequest(methodName, serverback, filePath, startTime, sendMsg, bc, log, server, saveAsStream, readable){
	var opt = {};
	var respOut = methodName + 'Output';
	var model = obsModel[respOut];
	var obj = model['parameters'];
	opt['CommonMsg'] = {};
	opt['InterfaceResult'] = null;
	opt['CommonMsg']['Status'] = serverback.statusCode;
	opt['CommonMsg']['Code'] = '';
	opt['CommonMsg']['Message'] = '';
	opt['CommonMsg']['HostId'] = '';
	opt['CommonMsg']['RequestId'] = '';
	var headers = serverback.headers;
	var headersStr = headerTostring(headers);
	
	log.runLog('info', methodName, 'get response start, statusCode:' + serverback.statusCode);
	log.runLog('debug', methodName, 'response msg :' + 'statusCode:' + serverback.statusCode + ', headers:' + headersStr);
	
	var doLog = function(){
		var logMsg = 'Status:' + opt['CommonMsg']['Status'] + ', Code:';
		if('Code' in opt['CommonMsg']){
			logMsg += opt['CommonMsg']['Code'];
		}
		logMsg += ', Message:';
		if('Message' in opt['CommonMsg']){
			logMsg += opt['CommonMsg']['Message'];
		}
		log.runLog('debug', methodName, 'exec interface ' + methodName + ' finish, ' + logMsg);
		bc(null,opt);
	};
	
	if(serverback.statusCode === 307 && !readable){
		let location = headers['location'];
		if(location){
			let err = 'http code is 307 need to redirect to ' + location;
			log.runLog('info', methodName, err);
			log.interfaceLog('info', methodName, server, startTime, sendMsg, '-1', 'error Msg:[' + err + ']');
			bc('redirect', location);
		}else{
			let err = 'get redirect code 307, but no location in headers';
			log.runLog('error', methodName, err);
			log.interfaceLog('error', methodName, server, startTime, sendMsg, '-1', 'error Msg:[' + err + ']');
			bc(err, null);
		}
	}else if(serverback.statusCode < 300){
		if(filePath){
			let fileDir = pathLib.dirname(filePath);
			if(!fs.existsSync(fileDir)){
				mkdirsSync(fileDir);
			}
			let stream = fs.createWriteStream(filePath);
			stream.on('error', function(err){
				stream.end();
				var headerStr = headerTostring(err);
				log.runLog('error', methodName, 'get response stream error [' + headerStr + ']');
				log.interfaceLog('error', methodName, server, startTime, sendMsg, '-1', 'error Msg:[' + headerStr + ']');
				bc(err, null);
			});
			serverback.pipe(stream);
			serverback.on('end', function(){
				stream.end();
				contrustCommonMsg(opt, obj, headers);
				log.runLog('debug', methodName, 'exec interface ' + methodName + ' finish, Status:' + opt['CommonMsg']['Status'] + ', Code: ,Message: ');
				log.interfaceLog('debug', methodName, server, startTime, sendMsg, '0', 'Status :' + opt['CommonMsg']['Status'] + ', headers:' + headerTostring(headers));
				doLog();
			});
		}else if(('data' in model) && saveAsStream){
			contrustCommonMsg(opt, obj, headers);
			let respMsg = 'Status: ' + opt['CommonMsg']['Status'] + ', headers: ' +  headersStr;
			log.interfaceLog('debug', methodName, server, startTime, sendMsg, '0', respMsg);
			
			for (let key in obj){
				if(obj[key]['location'] === 'body'){
					opt['InterfaceResult'][key] = serverback;
					break;
				}
			}
			doLog();
		}else{
			let bodys = [];
			let body = null;
			serverback.on('data', function(data) {
				bodys.push(data);
			}).on('error', function(err){
				var headerStr = headerTostring(err);
				log.runLog('error', methodName, 'get response stream error [' + headerStr + ']');
				log.interfaceLog('error', methodName, server, startTime, sendMsg, '-1', 'error Msg:[' + headerStr + ']');
				bc(err, null);
			}).on('end', function() {
				contrustCommonMsg(opt, obj, headers);
				body = Buffer.concat(bodys);
				
				let respMsg = 'Status: ' + opt['CommonMsg']['Status'] + ', headers: ' +  headersStr;
				if(body){
					respMsg += 'body length: ' + body.length;
					log.runLog('debug', methodName, 'response body length:' + body.length);
				}
				log.interfaceLog('debug', methodName, server, startTime, sendMsg, '0', respMsg);
				
				if(body && ('data' in model)){
					if(model['data']['type'] === 'xml'){
						makeObjFromXml(body, function(err,result){
							if(err){
								log.runLog('error', methodName, 'change xml to json err [' + headerTostring(err) + ']' );
								bc(err, null);
								return;
							}
							for (let key in obj){
								if(obj[key]['location'] === 'xml'){
									let tempResult = result;
									if('xmlRoot' in model['data'] && model['data']['xmlRoot']  !== ''){
										tempResult = result[model['data']['xmlRoot']];
									}
									if(tempResult !== '' && tempResult !== null && tempResult !== undefined){
										opt['InterfaceResult'][key] = jsonToObject(obj,tempResult,key)[key];
									}
								}
							}
						});
					}else if(model['data']['type'] === 'body'){
						for (let key in obj){
							if(obj[key]['location'] === 'body'){
								opt['InterfaceResult'][key] = body;
								break;
							}
						}
					}
				}
				doLog();
			});
		}
	}else{
		let body = '';
		serverback.on('data', function(data) {
			body += data;
		}).on('error', function(err){
			var headerStr = headerTostring(err);
			log.runLog('error', methodName, 'get response stream error [' + headerStr + ']');
			log.interfaceLog('error', methodName, server, startTime, sendMsg, '-1', 'error Msg:[' + headerStr + ']');
			bc(err, null);
		}).on('end', function() {
			let respMsg = 'Status: ' + opt['CommonMsg']['Status'] + ', headers: ' +  headersStr;
			if(body !== ''){
				respMsg += 'body: ' + body;
				log.runLog('debug', methodName, 'response body :' + body);
			}
			
			log.interfaceLog('debug', methodName, server, startTime, sendMsg, '0', respMsg);
			
			if(body){
				makeObjFromXml(body, function(err, re){
					if(err){
						log.runLog('error', methodName, 'change xml to json err [' + headerTostring(err) + ']' );
						bc(err,null);
						return;
					}
					if('Error' in re){
						var errMsg = re['Error'];
						if('Code' in errMsg){
							opt['CommonMsg']['Code'] = errMsg['Code'];
						}
						if('Message' in errMsg){
							opt['CommonMsg']['Message'] = errMsg['Message'];
						}
						if('HostId' in errMsg){
							opt['CommonMsg']['HostId'] = errMsg['HostId'];
						}
						if('RequestId' in errMsg){
							opt['CommonMsg']['RequestId'] = errMsg['RequestId'];
						}
					}
					doLog();
				});
			}else{
				doLog();
			}
		});
	}
	
}

function toXml(mXml, xmlMeta, root, sentAs){
	var xml = ''; 
	if(root !== null){
		xml += buildXml(mXml, xmlMeta, root, sentAs);
	}else{
		for (let key in xmlMeta){
			if(key in mXml){
				let _sentAs = xmlMeta[key]['sentAs'] || key;
				xml += buildXml(mXml, xmlMeta[key], key, _sentAs);
			}
		}
	}
	return xml;
}

function buildXml(mXml, xmlMeta, key, sentAs){
	var xml = '';
	let type = xmlMeta['type'];
	if(type === 'array'){
		for(let i = 0; i < mXml[key].length; i++){
			if(xmlMeta['items']['type'] === 'object'){
				let result = toXml(mXml[key][i],xmlMeta['items']['parameters'],null);
				if(result !== ''){
					xml += '<'+sentAs +'>'+ result + '</'+sentAs +'>';
				}
			}else if(xmlMeta['items']['type'] !== 'array'){
				xml += '<' + sentAs + '>'+ mXml[key][i] + '</' + sentAs +'>';
			}
		}
	}else if(type === 'object'){
		let result = toXml(mXml[key],xmlMeta['parameters'],null);
		if(result !== ''){
			xml += '<'+sentAs;
			if('data' in xmlMeta){
				if('xsiNamespace' in xmlMeta['data']){
					xml += '  xmlns:xsi="' +  xmlMeta['data']['xsiNamespace'] + '"';
				}
				if('xsiType' in xmlMeta['data']){
					xml += '  xsi:type="' + mXml[key][xmlMeta['data']['xsiType']] + '"';
				}
			}
			xml += '>';
			xml += result + '</'+sentAs +'>';
		}
		
	}else if(type !== 'ignore'){
		xml += '<'+sentAs + '>' + mXml[key] + '</'+sentAs+'>';
	}
	let wrapper = xmlMeta['wrapper'];
	if(xml && wrapper){
		xml = '<' + wrapper + '>' + xml + '</' + wrapper + '>';
	}
	return xml;
}

function buildObject(model, obj, key, opt){
	if(obj !== undefined && obj !== null){
		let wrapper = model[key]['wrapper'];
		if(wrapper && wrapper in obj){
			obj = obj[wrapper];
		}
		let sentAs = model[key]['sentAs'] || key;
		if(sentAs in obj){
			if(model[key]['type'] === 'object'){
				opt[key] = jsonToObject(model[key]['parameters'],obj[sentAs],null);
			}else if(model[key]['type'] === 'array'){
				let arr = [];
				if(!isArray(obj[sentAs])){
					if(model[key]['items']['type'] === 'object'){
						arr[0] = jsonToObject(model[key]['items']['parameters'],obj[sentAs],null);
					}else{
						arr[0] = obj[sentAs];
					} 
				}else{
					for (let i = 0; i < obj[sentAs].length; i++ ){
						if(model[key]['items']['type'] === 'object'){
							arr[i] = jsonToObject(model[key]['items']['parameters'],obj[sentAs][i],null);
						}else{
							arr[i] = obj[sentAs][i];
						} 
					}
				}
				opt[key] = arr;
			}else if(model[key]['type'] === 'date'){
				opt[key] = utcToLocaleString(obj[sentAs]);
			}else{
				opt[key] = obj[sentAs];
			}
		}
	}
	
	if(opt[key] === undefined){
		if(model[key]['type'] === 'object'){
			opt[key] = model[key]['parameters'] ? jsonToObject(model[key]['parameters'],null,null) : {};
		}else if(model[key]['type'] === 'array'){
			opt[key] = [];
		}else{
			opt[key] = '';
		}
	}
}

function getExpireDate(utcDateStr){
	var date = new Date(Date.parse(utcDateStr));
	var hour = date.getUTCHours();
	var min = date.getUTCMinutes();
	var sec = date.getUTCSeconds();
	var day = date.getUTCDate();
	var moth = date.getUTCMonth() + 1;
	var year = date.getUTCFullYear();
	var shortDate = '';
	var longDate = '';
	var expireDate = '';
	expireDate += year + '-';
	
	if(moth < 10){
		expireDate += '0';
	}
	expireDate += moth + '-';
	
	if(day < 10){
		expireDate += '0';
	}
	expireDate += day + 'T';
	
	if(hour < 10){
		expireDate += '0';
	}
	expireDate += hour + ':';
	
	if(min < 10){
		expireDate += '0';
	}
	expireDate += min + ':';
	
	if(sec < 10){
		expireDate += '0';
	}
	expireDate += sec + 'Z';
	return expireDate;
}

function getDates(utcDateStr){
	var date = new Date(Date.parse(utcDateStr));
	var hour = date.getUTCHours();
	var min = date.getUTCMinutes();
	var sec = date.getUTCSeconds();
	var day = date.getUTCDate();
	var moth = date.getUTCMonth() + 1;
	var year = date.getUTCFullYear();
	var shortDate = '';
	var longDate = '';
	shortDate += year;
	
	if(moth < 10){
		shortDate += '0';
	}
	shortDate += moth;
	
	if(day < 10){
		shortDate += '0';
	}
	shortDate += day;
	
	longDate += shortDate + 'T';
	if(hour < 10){
		longDate += '0';
	}
	longDate +=  hour;
	
	if(min < 10){
		longDate += '0';
	}
	longDate +=  min;
	
	if(sec < 10){
		longDate += '0';
	}
	longDate +=  sec + 'Z';
	return [shortDate, longDate];
}

function getSignedAndCanonicalHeaders(header){
	var arrheadKey = [];
	var arrhead = [];
	var j = 0;
	for(let key in header){
		arrheadKey[j] = key.toLowerCase();
		arrhead[key.toLowerCase()] = header[key];
		j++;
	}
	arrheadKey = arrheadKey.sort();
	var signedHeaders = '';
	var canonicalHeaders = '';
	for(let i = 0; i < arrheadKey.length; i++){
		if(i !== 0){
			signedHeaders += ';';
		}
		signedHeaders += arrheadKey[i];
		canonicalHeaders +=  arrheadKey[i] + ':' + arrhead[arrheadKey[i]] + '\n';
	}
	return [signedHeaders, canonicalHeaders];
}

function createV4Signature(shortDate, sk, region, stringToSign){
	var dateKey = crypto.createHmac('sha256', 'AWS4' + sk).update(shortDate).digest();
	var dateRegionKey = crypto.createHmac('sha256', dateKey).update(region).digest();
	var dateRegionServiceKey = crypto.createHmac('sha256', dateRegionKey).update('s3').digest();
	var signingKey = crypto.createHmac('sha256',dateRegionServiceKey).update('aws4_request').digest();
	return crypto.createHmac('sha256',signingKey).update(stringToSign).digest('hex');
}

function getV4Signature(shortDate,longDate, sk, region, canonicalRequest){
	var scop = shortDate + '/' + region + '/' + 's3' + '/' + 'aws4_request';
	var stringToSign = 'AWS4-HMAC-SHA256' + '\n';
	stringToSign += longDate + '\n';
	stringToSign += scop + '\n';
	stringToSign += crypto.createHash('sha256').update(canonicalRequest).digest('hex');
	
	return createV4Signature(shortDate, sk, region, stringToSign);
}


function v4Auth(region, ak, sk, opt, log, methodName){
	
	opt['headers']['x-amz-content-sha256'] = CONTENT_SHA256;
	var header = opt['headers'];
	
	var shortDate = null;
	var longDate = null;
	
	if('x-amz-date' in header){
		longDate = header['x-amz-date'];
		shortDate = longDate.slice(0, longDate.indexOf('T'));
	}else{
		var utcDateStr = header['date'];
		var dates = getDates(utcDateStr);
		shortDate = dates[0];
		longDate = dates[1];
	}

	
	var credenttial = ak + '/' + shortDate + '/' + region + '/' + 's3' + '/' + 'aws4_request';
	
	var signedAndCanonicalHeaders = getSignedAndCanonicalHeaders(header);
	
	var signedHeaders = signedAndCanonicalHeaders[0];
	var canonicalHeaders = signedAndCanonicalHeaders[1];
	
	var canonicalQueryString = '';
	if(opt['urlPath'] !== '' && opt['urlPath'][0] === '?'){
		let path = opt['urlPath'];
		path = path.slice(1);
		let arrPath = path.split('&');
		arrPath = arrPath.sort();
		for(let item in arrPath){
			canonicalQueryString += arrPath[item];
			if(arrPath[item].indexOf('=') === -1){
				canonicalQueryString += '=';
			}
			canonicalQueryString += '&';
		}
		canonicalQueryString = canonicalQueryString.substring(0,
				canonicalQueryString.length - 1);
	}
	var canonicalRequest = opt['method'] + '\n';
	canonicalRequest += opt['uri'] +  '\n';
	canonicalRequest += canonicalQueryString + '\n';
	canonicalRequest +=  canonicalHeaders + '\n';
	canonicalRequest += signedHeaders + '\n';
	canonicalRequest += CONTENT_SHA256;
	log.runLog('debug',methodName, 'canonicalRequest:' + canonicalRequest);
	
	var signature = getV4Signature(shortDate, longDate, sk, region, canonicalRequest);
	
	opt['headers']['authorization'] = 'AWS4-HMAC-SHA256 ' + 'Credential=' + credenttial + ',' + 'SignedHeaders=' + signedHeaders + ',' + 'Signature=' + signature;
	return opt;
}

function Utils(log_in) {
	this.log = log_in;
	this.access_key_id = null;
	this.secret_access_key = null;
	this.security_token = null;
	this.is_secure = true; 
	this.server = null;
	this.path_style = false;
	this.signature = 'v2';
	this.region = 'region';
	this.port = null;
	this.max_retry_count = 3;
	this.timeout = 60;
	this.ssl_verify = false;
	this.http = null;
	this.https = null;
	this.httpAgent = false;
	this.httpsAgent = false;
	this._obsSdkVersion = OBS_SDK_VERSION;
}

Utils.prototype.mimeTypes = mimeTypes;

Utils.prototype.close = function(){
	if(this.httpAgent){
		this.httpAgent.destroy();
	}
	if(this.httpsAgent){
		this.httpsAgent.destroy();
	}
};

Utils.prototype.refresh = function(access_key_id, secret_access_key, security_token){
	this.access_key_id = String(access_key_id);
	this.secret_access_key = String(secret_access_key);
	if(security_token){
		this.security_token = String(security_token);
	}else{
		this.security_token = null;
	}
};

Utils.prototype.initFactory = function(access_key_id, secret_access_key, is_secure,
		server, path_style, signature, region, port, max_retry_count, timeout, ssl_verify, long_conn_param, security_token){
	
	this.refresh(access_key_id, secret_access_key, security_token);
	
	if (server === undefined) {
		throw new Error('Server is not set');
	}
	this.server = String(server).trim();
	
	if (is_secure !== undefined) {
		this.is_secure = Boolean(is_secure);				
	}
	if (path_style !== undefined) {
		this.path_style = Boolean(path_style);				
	}
	if (signature !== undefined) {
		this.signature = String(signature).toLowerCase();			
	}
	
	if(region !== undefined){
		this.region = String(region);
	}
	
	this.port = port === undefined ? (this.is_secure ? 443 : 80) : parseInt(port);
	
	if(max_retry_count !== undefined){
		this.max_retry_count = parseInt(max_retry_count);
	}
	
	if(timeout !== undefined){
		this.timeout = parseInt(timeout);
	}
	
	if(ssl_verify !== undefined){
		this.ssl_verify = ssl_verify;
	}
	
	this.http = http;
	
	this.https = https;
	
	if(long_conn_param !== undefined && Number(long_conn_param) >= 0){
		this.httpAgent = new this.http.Agent({keepAlive : true, keepAliveMsecs : Number(long_conn_param) * 1000});
		this.httpsAgent = new this.https.Agent({keepAlive : true, keepAliveMsecs : Number(long_conn_param) * 1000});
	}

};

Utils.prototype.doSend = function(req, srcFile, initPos, totalCount, methodName, server, startTime, msg, bc){
	var log = this.log;
	fs.open(srcFile, 'r', function(err, fd){
		if(err){
			req.abort();
			fs.close(fd,function(err){});
			log.runLog('error', methodName, 'read file to send error [' + err + ']');
			log.interfaceLog('error', methodName, server, startTime, msg, '-1', 'error Msg:[' + err + ']');
			bc(err, null);
			return;
		}
		
		var buffer = Buffer.alloc(65536);
		var _doSend = function(sendPosition, sendCount){
			if(sendCount >= totalCount){
				req.end();
				fs.close(fd,function(err){});
				return;
			}
			
			var sendCountOnce = (totalCount - sendCount) > buffer.length ?  buffer.length : totalCount - sendCount;
			
			fs.read(fd, buffer, 0, sendCountOnce, sendPosition, function(err, bytes){
				if (err){
					req.abort();
					fs.close(fd,function(err){});
					log.runLog('error', methodName, 'read file to send error [' + err + ']');
					log.interfaceLog('error', methodName, server, startTime, msg, '-1', 'error Msg:[' + err + ']');
					bc(err, null);
					return;	
			    }
		    	if(bytes <= 0){
		    		req.end();
		    		fs.close(fd, function(err){});
		    		return;
		    	}
	    		req.write(buffer.slice(0, bytes), function(err){
	    			if(err){
	    				req.abort();
	    				fs.close(fd,function(err){});
	    				log.runLog('error', methodName, 'read file to send error [' + err + ']');
	    				log.interfaceLog('error', methodName, server, startTime, msg, '-1', 'error Msg:[' + err + ']');
						bc(err, null);
						return;
	    			}
	    			_doSend(sendPosition + bytes, sendCount + bytes);
	    		});
			});
		};
		_doSend(initPos, 0);
	});
};

Utils.prototype.makeRequest = function(methodName, opt, bc){
	var log = this.log;
	var server = this.server;
	var body = null;
	if('xml' in opt){
		body = opt['xml'];
		if(!(body instanceof streamLib.Readable)){
			body = Buffer.from(String(body), 'utf8');
			if(opt['xmlToMd5']){
				opt['headers']['Content-MD5'] = this.bufMD5(body);
				delete opt['xmlToMd5'];
			}
			opt['headers']['content-length'] = body.length === 0 ? '0' : String(body.length);
		}
	}

	opt['headers']['date'] = new Date().toUTCString();
	
	if('authorization' in opt['headers']){
		delete opt['headers']['authorization'];//retry bug fix
	}
	
	var path = opt['_uri'] ? opt['_uri'] : opt['uri'];
	path += opt['urlPath'];
	
	
	var ak = this.access_key_id;
	var sk = this.secret_access_key;
	
	if(this.security_token){
		opt['headers']['x-amz-security-token'] = this.security_token;
	}
	
    opt = this.signature.toLowerCase() === 'v4' ? v4Auth(this.region, ak, sk, opt, log, methodName) : v2Auth(ak, sk, opt,log, methodName);

	var ex = opt['headers'];
	ex['User-Agent'] = 'obs-sdk-js/' + OBS_SDK_VERSION;
	var header_msg = [];
	for (let key in ex){
		header_msg[key] = ex[key];
	}
	if ('authorization' in header_msg){
		header_msg['authorization'] = '*';
	}

	var msg = 'method:' + opt['method'] + ', path:' + path + 'headers:' + headerTostring(header_msg);

	if (opt['xml'] !== '' && opt['xml'] !== null) {
		msg += 'body:' + opt['xml'];
	}
	
	log.runLog('info', methodName, 'prepare request parameters ok,then Send request to service start');
	log.runLog('debug',methodName, 'request msg:' + msg);
	let method = opt['method'];
	var reopt = {
		method : method,
		host : ex['host'],
		port : opt['port'] || this.port,
		path : path,
		ca : !this.ssl_verify || !fs.existsSync(String(this.ssl_verify)) ? null : fs.readFileSync(String(this.ssl_verify)),
		checkServerIdentity: function (host, cert) {
		    return undefined;//do not verify hostname
		},
		rejectUnauthorized : Boolean(this.ssl_verify),
		headers : ex
	};
	
	var startTime = log.getNowTime();
	var start = new Date().getTime();
	
	var _is_secure = opt['protocol'] ? opt['protocol'].toLowerCase().indexOf('https') === 0 : this.is_secure;
	
	reopt.agent = _is_secure ? this.httpsAgent : this.httpAgent;
	
	var _http = _is_secure ? this.https : this.http;
	
	var req = _http.request(reopt);
	req.setNoDelay(true);
	req.setTimeout(this.timeout * 1000);
	
	var readable = body !== null && (body instanceof streamLib.Readable);
	
	req.on('response', 	function(serverback) {
		log.interfaceLog('info', methodName, server, startTime, 'http cost ' +  (new Date().getTime()-start) + ' ms', '0');
		getRequest(methodName, serverback, opt['dstFile'], startTime, msg, bc, log, server, opt['SaveAsStream'], readable);
	});
	
	req.on('error', function(err){
		let headerStr = headerTostring(err);
		log.runLog('error', methodName, 'Send request to service error [' + headerStr + ']');
		log.interfaceLog('error', methodName, server, startTime, msg, '-1','error Msg:[' + headerStr + ']');
		log.interfaceLog('info', methodName, server, startTime, 'http cost ' +  (new Date().getTime()-start) + ' ms', '-1');
		bc(err, null);
	});
	
	if(method === 'GET' || method === 'HEAD' || method === 'OPTIONS'){
		req.end();
		return;
	}
	
	
	if(body !== null){
		if(readable){
			if('ContentLength' in opt){
				let contentLength = parseInt(opt['ContentLength']);
				let writeCount = 0;
				body.on('data', function(data){
					if(writeCount >= contentLength){
						req.end();
						if(body.destroy){
							body.destroy();
						}
						return;
					}
					if(contentLength - writeCount > data.length){
						req.write(data);
						writeCount += data.length;
					}else{
						req.write(Buffer.from(data, 0, contentLength - writeCount));
						writeCount = contentLength;
					}
				});
			}else{
				body.pipe(req);
			}
			body.on('error',function(err){
				req.abort();
				var headerStr = headerTostring(err);
				log.runLog('error', methodName, 'read file to send error [' + headerStr + ']');
				log.interfaceLog('error', methodName, server, startTime, msg, '-1', 'error Msg:[' + headerStr + ']');
				bc(err,null);
			});
			body.on('end', function(){
				req.end();
			});
		}else{
			req.write(String(body));
			req.end();
		}
		return;
	}
	if(!('srcFile' in opt)){
		req.end();
		return;
	}
	if(opt['Offset'] >= 0 && opt['PartSize'] > 0){
		this.doSend(req, opt['srcFile'], opt['Offset'], parseInt(opt['PartSize']), methodName, server, startTime, msg, bc);
	}else if('ContentLength' in opt){
		this.doSend(req, opt['srcFile'], 0, parseInt(opt['ContentLength']), methodName, server, startTime, msg, bc);
	}else{
		let stream = fs.createReadStream(opt['srcFile']);
		stream.on('error', function(err){
			req.abort();
			var headerStr = headerTostring(err);
			log.runLog('error', methodName, 'read file to send error [' + headerStr + ']');
			log.interfaceLog('error', methodName, server, startTime, msg, '-1', 'error Msg:[' + headerStr + ']');
			bc(err, null);
		});
		stream.pipe(req);
		stream.on('end', function(){
			req.end();
		});
	}
	
};


Utils.prototype.makeParam = function(methodName, param){
	var model = obsModel[methodName];
	var method = model['httpMethod'];
	var uri = '/';
	var urlPath = '';
	var xml = '';
	var exheaders = {};
	var opt = {};
	var xmlFlag = false;
		
	if ('urlPath' in model){
		urlPath += '?' + model['urlPath'];
	}
	for (let key in model['parameters']){
		let meta = model['parameters'][key];
		if (('required' in meta) && !(key in param)){
			opt['err'] = key + ' is a required element!';
			this.log.runLog('error', methodName, opt['err']);
			return opt;
		}
		
		if(key in param && param[key] !== null && param[key] !== undefined){
			if(meta['type'] === 'srcFile' || meta['type'] === 'dstFile'){
				opt[meta['type']] = param[key];
				continue;
			}
			
			if(meta['type'] === 'plain'){
				opt[key] = param[key];
			}
			
			let sentAs = meta['sentAs'] || key; 
			
			if(meta['location'] === 'uri'){
				if(uri !== '/'){
					uri += '/';
				}
				uri += param[key];
			}else if(meta['location'] === 'header'){
				if(meta['type'] === 'object'){
					if('x-amz-meta-' === sentAs){
						for(let item in param[key]){
							let iKey = item.toLowerCase().indexOf(sentAs) === 0 ? item.toLowerCase() : sentAs + item.toLowerCase();
							exheaders[iKey.trim()] = encodeURIWithSafe(param[key][item], ' ,:?/+=%');
						}
					}
				}else if(meta['type'] === 'array'){
					let arr = [];
					for(let item in param[key]){
						arr[item] = encodeURIWithSafe(param[key][item], ' ,:?/+=%');
					}
					exheaders[sentAs] = arr;
				}else if(meta['type'] === 'password'){
					exheaders[sentAs] = Buffer.from(param[key],'utf8').toString('base64');
					let pwdSentAs = meta['pwdSentAs'] || (sentAs + '-MD5');
					exheaders[pwdSentAs] = this.strMD5(param[key]);
				}else {
					exheaders[sentAs] = encodeURIWithSafe(param[key], ' ,:?/+=%');
				}
			}else if(meta['location'] === 'urlPath'){
				let sep = urlPath === '' ? '?' : '&';
				let value = param[key];
				if(meta['type'] === 'number'){
					value = Number(value);
					if(value >= 0){
						urlPath += sep + encodeURIWithSafe(sentAs, ',:?&%') + '=' + encodeURIWithSafe(String(value), ',:?&%');
					}
				}else{
					urlPath += sep + encodeURIWithSafe(sentAs, ',:?&%') + '=' + encodeURIWithSafe(String(param[key]), ',:?&%');
				}
			}else if(meta['location'] === 'xml'){
				xmlFlag = true;
				let mxml = toXml(param,meta,key,sentAs);
				if(mxml){
					xml += mxml;
				}
			}else if(meta['location'] === 'body'){
				xml = param[key];
			}		
		}
	}
	
	if('data' in model){
		if(xmlFlag){
			let head = '';
				if('xmlRoot' in model['data']){
					head += '<?xml version="1.0" encoding="UTF-8"?>';
					head += '<' + model['data']['xmlRoot'];
					let ns = defaultNs;
					if('namespace' in model['data']){
						ns = model['data']['namespace'];
					}
					head += '  xmlns="' + ns + '"';
					head += '>';
				}
			xml = head + xml + '</' + model['data']['xmlRoot'] + '>';
		}
		
		if(xml && model['data']['md5']){
			opt['xmlToMd5'] = true;
		}
	}
	
	exheaders['host'] = this.server;
	if(!this.path_style){
		let uriList = uri.split('/');
		if(uriList.length >= 2 && uriList[1] !== null && uriList[1] !== ''){
			exheaders['host'] = uriList[1] + '.' + this.server;
			let _uri = uri.replace(uriList[1], '');
			if(_uri.indexOf('//') === 0){
				_uri = _uri.slice(1);
			}
			if(this.signature.toLowerCase() === 'v4'){
				uri = _uri;
			}else{
				if(_uri === '/'){
					uri = uri + '/';
				}
				opt['_uri'] = encodeURIWithSafe(_uri, ',:/=+?&%');
			}
		}
	}
	opt['method'] = method;
	opt['uri'] = encodeURIWithSafe(uri, ',:/=+?&%');
	opt['urlPath'] = urlPath;
	if(xml !== ''){
		opt['xml'] = xml;
		this.log.runLog('debug', methodName, 'request content:' + xml);
	}
	opt['headers'] = exheaders;
	
	if('srcFile' in opt){
		if (!fs.existsSync(opt['srcFile'])) {
			opt['err'] = 'the file [' + opt['srcFile']+ '] is not exist!';
			this.log.runLog('error', methodName, opt['err']);
			return opt;
		}
		
		let fileSize = fs.statSync(opt['srcFile']).size;
		
		if (!('content-length' in opt['headers'])) {
			if('PartSize' in opt || 'Offset' in opt){
				let offset = opt['Offset'];
				let partSize = opt['PartSize'];
				offset = offset && offset >= 0 && offset < fileSize ? offset : 0;
				partSize = partSize && partSize > 0 && partSize <= fileSize - offset ? partSize : fileSize - offset;
				opt['PartSize'] = partSize;
				opt['Offset'] = offset;
				opt['headers']['content-length'] = String(opt['PartSize']);
			}
		}else{
			if(parseInt(opt['headers']['content-length']) > fileSize){
				opt['headers']['content-length'] = String(fileSize);
				if('ContentLength' in opt){
					opt['ContentLength'] = fileSize;
				}
			}
		}
		if (!('content-type' in opt['headers'])) {
			opt['headers']['content-type'] = '';
		}
	}
	return opt;
};


Utils.prototype.sendRequest = function(funcName, opt, backcall, count){
	if(count === undefined){
		count = 1;
	}
	var that = this;
	this.makeRequest(funcName,opt, function(err,msg){
		if(err && msg !== 'SELF_SIGNED_CERT_IN_CHAIN' && msg !== 'DEPTH_ZERO_SELF_SIGNED_CERT' && count <= that.max_retry_count){
			that.sendRequest(funcName, opt, backcall, count + 1);
		}else if(err === 'redirect' && msg){
			var uri = urlLib.parse(msg);
			opt['headers']['host'] = uri.hostname;
			opt['protocol'] = uri.protocol;
			opt['port'] = uri.port || (opt['protocol'].toLowerCase().indexOf('https') === 0 ? 443 : 80);
			that.sendRequest(funcName, opt, backcall);
		}else{
			backcall(err,msg);
		}
	});
};

Utils.prototype.strMD5 = function(data) {
	var buf = Buffer.from(data, 'utf8');
	var str = buf.toString();
	return crypto.createHash('md5').update(str).digest('base64');
};

Utils.prototype.bufMD5 = function(buf) {
	var str = buf.toString();
	return crypto.createHash('md5').update(str).digest('base64');
};

Utils.prototype.fileMD5 = function (filePath, bc){
	var stream = fs.createReadStream(filePath);
	var sha = crypto.createHash('md5');
	stream.on('error',function(err){
		if(err){				
			bc(err,null);
		}
	});
	stream.on('data', function(data){
		sha.update(data);
	});
	stream.on('end', function(){
		var md5 = sha.digest('base64');
		bc(null, md5);
	});
};


Utils.prototype.fileMD5Partly = function(filePath, offset, partSize){
	var eventEmitter = new events.EventEmitter();
	
	fs.stat(filePath, function (err, stats) {
		if(err){
			eventEmitter.emit('error',err);
			return;
		}
		if(!stats.isFile()){
			eventEmitter.emit('error','the file [' + filePath + '] is not a valid file!');
			return;
		}
		var fileSize = stats.size;
		offset = offset && offset >= 0 && offset < fileSize ? offset : 0;
		partSize = partSize && partSize > 0 && partSize <= fileSize - offset ? partSize : fileSize - offset;
		
		fs.open(filePath,'r',function(err, fd){
			if(err){
				eventEmitter.emit('error',err);
				fs.close(fd, function(err){});
				return;
			}
			
			var buffer = Buffer.alloc(65536);
			var sha = crypto.createHash('md5');
			
			var doRead = function(readPosition, readCount){
				
				if(readCount >= partSize){//已读字节数达到partSize
					eventEmitter.emit('success', sha.digest('base64'), offset, partSize);
					fs.close(fd, function(err){});
					return;
				}
				
				var readCountOnce = (partSize - readCount) > buffer.length ?  buffer.length : partSize - readCount;
				
				fs.read(fd, buffer, 0, readCountOnce, readPosition, function(err, bytes){
				      if (err){
				    	  eventEmitter.emit('error',err);
				    	  fs.close(fd, function(err){});
				    	  return;
				      }
			    	  if(bytes <= 0){//文件尾部
			    		  eventEmitter.emit('success', sha.digest('base64'),offset, partSize);
			    		  fs.close(fd, function(err){});
			    	  }else{
			    		  sha.update(buffer.slice(0, bytes));
			    		  doRead(readPosition + bytes, readCount + bytes);
			    	  }
				 });	
			};
			doRead(offset, 0);
		});
	});
	
	return eventEmitter;
};

Utils.prototype.createV2SignedUrlSync = function(param){
	param = param || {};
	
	var method = param['Method'] ? String(param['Method']) : 'GET';
	var bucketName = param['Bucket'] ? String(param['Bucket']) : null;
	var objectKey = param['Key'] ? String(param['Key']) : null;
	var specialParam = param['SpecialParam'] ? String(param['SpecialParam']) : null;
	
	var expires = param['Expires'] ? parseInt(param['Expires']) : 300;
	var headers = {};
	if(param['Headers'] && (param['Headers'] instanceof Object) && !(param['Headers'] instanceof Array)){
		for(let key in param['Headers']){
			headers[key] = param['Headers'][key];
		}
	}
	
	if(this.security_token && !headers['x-amz-security-token']){
		headers['x-amz-security-token'] = this.security_token;
	}
	
	var queryParams = {};
	if(param['QueryParams'] && (param['QueryParams'] instanceof Object) && !(param['QueryParams'] instanceof Array)){
		for(let key in param['QueryParams']){
			queryParams[key] = param['QueryParams'][key];
		}
	}
			
	var result = '';
	var resource = '';
	var host = this.server;
	if(bucketName){
		resource += '/' + bucketName;
		if(this.path_style){
			result += '/' + bucketName;
		}else{
			host = bucketName + '.' + host;
			resource += '/';
		}
	}
	
	if(objectKey){
		objectKey = encodeURIWithSafe(objectKey, ',:/+=?&%');
		result += '/' + objectKey;
		if(resource.lastIndexOf('/') !== resource.length - 1){
			resource += '/';
		}
		resource += objectKey;
	}
	
	if(resource === ''){
		resource = '/';
	}
	
	result += '?';
	
	if(specialParam){
		queryParams[specialParam] = '';
	}
	
	queryParams['AWSAccessKeyId'] = this.access_key_id;
	
	if(expires < 0){
		expires = 300;
	}
	expires = parseInt(new Date().getTime() / 1000) + expires;
	
	queryParams['Expires'] = String(expires);
	
	for(let name in headers){
		headers[String(name).toLowerCase()] = headers[name];
	}
	
	var queryParamsKeys = [];
	for(let key in queryParams){
		queryParamsKeys.push(key);
	}
	queryParamsKeys.sort();
	var index = 0;
	var flag = false;
	var _resource = [];
	for(let i=0;i<queryParamsKeys.length;i++){
		let key = queryParamsKeys[i];
		let val = queryParams[key];
		key = encodeURIWithSafe(key, ',:?&%');
		val = encodeURIWithSafe(val, ',:?&%');
		result += key;
		if(val){
			result += '=' + val;
		}
		if(allowedResourceParameterNames.indexOf(key.toLowerCase())>=0){
			flag = true;
			let _val = val ? key + '=' + decodeURIComponent(val) : key;
			_resource.push(_val);
		}
		result += '&';
		index++;
	}
	_resource = _resource.join('&');
	if(flag){
		_resource = '?' + _resource;
	}
	resource += _resource;
	var stringToSign = [method];
	stringToSign.push('\n');
	
	if('content-md5' in headers){
		stringToSign.push(headers['content-md5']);
	}
	stringToSign.push('\n');
	
	if('content-type' in headers){
		stringToSign.push(headers['content-type']);
	}
	stringToSign.push('\n');
	
	stringToSign.push(String(expires));
	stringToSign.push('\n');
	
	var amz = [];
	var i = 0;
	for(let key in headers){
		if (key.length > 'x-amz-'.length && key.slice(0,'x-amz-'.length) === 'x-amz-'){
			amz[i++] = key;
		}
	}
	amz = amz.sort();
	for(let key in amz){
		stringToSign.push(amz[key]);
		stringToSign.push(':');
		stringToSign.push(headers[amz[key]]);
		stringToSign.push('\n');
	}
	
	stringToSign.push(resource);
	var hmac = crypto.createHmac('sha1', this.secret_access_key);
	hmac.update(stringToSign.join(''));
	
	result += 'Signature=' + encodeURIWithSafe(hmac.digest('base64'), ',:?&%');
	
	return {
		'ActualSignedRequestHeaders' : headers,
		'SignedUrl' : (this.is_secure ? 'https' : 'http') + '://' + host + ':' + this.port + result
	};
};

Utils.prototype.createV4SignedUrlSync = function(param){
	param = param || {};
	
	var method = param['Method'] ? String(param['Method']) : 'GET';
	var bucketName = param['Bucket'] ? String(param['Bucket']) : null;
	var objectKey = param['Key'] ? String(param['Key']) : null;
	var specialParam = param['SpecialParam'] ? String(param['SpecialParam']) : null;
	
	var expires = param['Expires'] ? parseInt(param['Expires']) : 300;
	var headers = {};
	if(param['Headers'] && (param['Headers'] instanceof Object) && !(param['Headers'] instanceof Array)){
		for(let key in param['Headers']){
			headers[key] = param['Headers'][key];
		}
	}
	
	if(this.security_token && !headers['x-amz-security-token']){
		headers['x-amz-security-token'] = this.security_token;
	}
	
	var queryParams = {};
	if(param['QueryParams'] && (param['QueryParams'] instanceof Object) && !(param['QueryParams'] instanceof Array)){
		for(let key in param['QueryParams']){
			queryParams[key] = param['QueryParams'][key];
		}
	}
			
	var result = '';
	var resource = '';
	var host = this.server;
	if(bucketName){
		if(this.path_style){
			result += '/' + bucketName;
			resource += '/' + bucketName;
		}else{
			host = bucketName + '.' + host;
		}
	}
	
	if(objectKey){
		objectKey = encodeURIWithSafe(objectKey, ',:/+=?&%');
		result += '/' + objectKey;
		resource += '/' + objectKey;
	}
	
	if(resource === ''){
		resource = '/';
	}
	
	result += '?';
	
	if(specialParam){
		queryParams[specialParam] = '';
	}
	
	if(expires < 0){
		expires = 300;
	}

	var utcDateStr = headers['date'] || headers['Date'] || new Date().toUTCString();
	
	var dates = getDates(utcDateStr);
	var shortDate = dates[0];
	var longDate = dates[1];
	
	headers['host'] = host;
	
	queryParams['X-Amz-Algorithm'] = 'AWS4-HMAC-SHA256';
	queryParams['X-Amz-Credential'] = this.access_key_id + '/' + shortDate + '/' + this.region + '/' + 's3' + '/' + 'aws4_request';
	queryParams['X-Amz-Date'] = longDate;
	queryParams['X-Amz-Expires'] = String(expires);
	
    var signedAndCanonicalHeaders = getSignedAndCanonicalHeaders(headers);
	
	queryParams['X-Amz-SignedHeaders'] = signedAndCanonicalHeaders[0];
	
	var _queryParams = {};
	var queryParamsKeys = [];
	for(let key in queryParams){
		let val = queryParams[key];
		key = encodeURIWithSafe(key, ',:?&%');
		val = encodeURIWithSafe(val, ',:?&%');
		_queryParams[key] = val;
		queryParamsKeys.push(key);
		result += key;
		if(val){
			result += '=' + val;
		}
		result += '&';
	}
	
	var canonicalQueryString = '';
	
	queryParamsKeys.sort();
	
	for(let i=0;i<queryParamsKeys.length;){
		canonicalQueryString += queryParamsKeys[i] + '=' + _queryParams[queryParamsKeys[i]];
		if(++i !== queryParamsKeys.length){
			canonicalQueryString += '&';
		}
	}
	
	var canonicalRequest = method + '\n';
	canonicalRequest += resource +  '\n';
	canonicalRequest += canonicalQueryString + '\n';
	canonicalRequest += signedAndCanonicalHeaders[1] + '\n';
	canonicalRequest += signedAndCanonicalHeaders[0] + '\n';
	canonicalRequest += 'UNSIGNED-PAYLOAD';
	
	var signature = getV4Signature(shortDate, longDate, this.secret_access_key, this.region, canonicalRequest);
	
	result += 'X-Amz-Signature=' + encodeURIWithSafe(signature, ',:?&%');
	
	return {
		'ActualSignedRequestHeaders' : headers,
		'SignedUrl' : (this.is_secure ? 'https' : 'http') + '://' + host + ':' + this.port + result
	};
			
};

Utils.prototype.createV4PostSignatureSync = function(param){
	param = param || {};
	
	var bucketName = param['Bucket'] ? String(param['Bucket']) : null;
	var objectKey = param['Key'] ? String(param['Key']) : null;
	var expires = param['Expires'] ? parseInt(param['Expires']) : 300;
	var formParams = {};
	
	if(param['FormParams'] && (param['FormParams'] instanceof Object) && !(param['FormParams'] instanceof Array)){
		for(let key in param['FormParams']){
			formParams[key] = param['FormParams'][key];
		}
	}
	
	if(this.security_token && !formParams['x-amz-security-token']){
		formParams['x-amz-security-token'] = this.security_token;
	}
	
	var utcDateStr = new Date().toUTCString();
	var dates = getDates(utcDateStr);
	var shortDate = dates[0];
	var longDate = dates[1];
	
	var credential = this.access_key_id + '/' + shortDate + '/' + this.region + '/' + 's3' + '/' + 'aws4_request';
	
	var expireDate = new Date();
	expireDate.setTime(parseInt(new Date().getTime()) + expires * 1000);
	
	expireDate = getExpireDate(expireDate.toUTCString());
	
	formParams['X-Amz-Algorithm'] = 'AWS4-HMAC-SHA256';
	formParams['X-Amz-Date'] = longDate;
	formParams['X-Amz-Credential'] = credential;
	
	if(bucketName){
		formParams['bucket'] = bucketName;
	}
	
	if(objectKey){
		formParams['key'] = objectKey;
	}
	
	var policy = [];
	policy.push('{"expiration":"');
	policy.push(expireDate);
	policy.push('", "conditions":[');
	
	var matchAnyBucket = true;
	var matchAnyKey = true;
	
	var conditionAllowKeys = ['acl', 'bucket', 'key', 'success_action_redirect', 'redirect', 'success_action_status'];
	
	for(let key in formParams){
		if(key){
			let val = formParams[key];
			key = String(key).toLowerCase();
			
			if(key === 'bucket'){
				matchAnyBucket = false;
			}else if(key === 'key'){
				matchAnyKey = false;
			}
			
			if(allowedResponseHttpHeaderMetadataNames.indexOf(key) < 0 && conditionAllowKeys.indexOf(key) < 0 && key.indexOf('x-amz-') !== 0){
				key = 'x-amz-meta-' + key;
			}
			
			policy.push('{"');
			policy.push(key);
			policy.push('":"');
			policy.push(val !== null ? String(val) : '');
			policy.push('"},');
		}
	}
	
	if(matchAnyBucket){
		policy.push('["starts-with", "$bucket", ""],');
	}
	
	if(matchAnyKey){
		policy.push('["starts-with", "$key", ""],');
	}
	
	policy.push(']}');
	
	var originPolicy = policy.join('');
	
	policy = Buffer.from(originPolicy,'utf8').toString('base64');
	
	var signature = createV4Signature(shortDate, this.secret_access_key, this.region, policy);
	
	return {
		'OriginPolicy' : originPolicy,
		'Policy' : policy,
		'Algorithm' : formParams['X-Amz-Algorithm'],
		'Credential' : formParams['X-Amz-Credential'],
		'Date' : formParams['X-Amz-Date'],
		'Signature' : signature
	};
};

module.exports = Utils;

