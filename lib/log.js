
'use strict';

const os = require('os');
const fs = require('fs');
const process = require('process');
const path = require('path');
const log4js = require('log4js');
var localIP = '';

function checkAndCreateDir(dir,path){
	if(!fs.existsSync(dir)){
		let rout = path.dirname(dir);
		if(!fs.existsSync(rout)){
			checkAndCreateDir(rout);
		}
		fs.mkdirSync(dir);
	}
}

function getLocalIP(){
	 var network = os.networkInterfaces();
	 for(let key in network){
		let iface = network[key];
		for(let i = 0; i < iface.length; i++){
			let alias = iface[i];
			if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
				return alias.address;
			}
		}
	 }
	 return '';
}


function LogUtil(){
	this.loggerInf = null;
	this.loggerRun = null;
	this.consoleLog = null;
}

LogUtil.prototype.initLog = function(filename, maxLogSize, backups, level, logToConsole){
	process.on('uncaughtException', function (err) {
		console.log(err);
	});
	var dir = path.dirname(filename);
	checkAndCreateDir(dir,path);
	var ext = path.extname(filename);
	var file = path.basename(filename, ext);
	if(!ext){
		ext = '.log';
	}
	
	level = level === undefined ? 'info' : String(level);
	maxLogSize = maxLogSize === undefined ? 102400 : parseInt(maxLogSize);
	backups = backups === undefined ? 10 : parseInt(backups);
	
	var fileInterface = path.join(dir, file + ext);
	var fileRun = fileInterface;
	var layout = {
		type:'pattern',
		pattern: '%d{yyyy/MM/dd hh:mm:ss SSS}|%-5p|%m'
	};
	log4js.configure({
		appenders:[
			{
				type:'console',
				category:'console',
				layout: layout
			},
			{
				type:'file',
				category:'interfaceLog',
				filename:fileInterface,
				maxLogSize:maxLogSize,
				backups:backups,
				layout:layout
			},
			{
				type:'file',
				category:'runLog',
				filename:fileRun,
				maxLogSize:maxLogSize,
				backups:backups,
				layout:layout
			}
		],
		replaceConsole:false,
		levels:{
			interfaceLog:level.toLowerCase(),
			runLog:level.toLowerCase(),
			console:level.toLowerCase()
		}
	});
	this.loggerInf = log4js.getLogger('interfaceLog');
	this.loggerRun = log4js.getLogger('runLog');
	if(logToConsole){
		this.consoleLog = log4js.getLogger('console');
	}
	if(!localIP){
		localIP = getLocalIP();
	}
};

LogUtil.prototype.interfaceLog = function(level, methodName, serviceAddress, startTime, msg, resultCode, resp){
	if(!this.loggerInf){
		return;
	}
	var form = [methodName,startTime,msg,resultCode,resp].join('|');
	if(level.toLowerCase() === 'debug'){
		this.loggerInf.debug(form);
		if(this.consoleLog){
			this.consoleLog.debug(form);
		}
	}else if(level.toLowerCase() === 'info'){
		this.loggerInf.info(form);
		if(this.consoleLog){
			this.consoleLog.info(form);
		}
	}else if(level.toLowerCase() === 'warn'){
		this.loggerInf.warn(form);
		if(this.consoleLog){
			this.consoleLog.warn(form);
		}
	}else if(level.toLowerCase() === 'error'){
		this.loggerInf.error(form);
		if(this.consoleLog){
			this.consoleLog.error(form);
		}
	}
};

LogUtil.prototype.runLog = function(level, methodName, msg){
	if(!this.loggerRun){
		return;
	}
	var form = methodName + '|' + msg;

	if(level.toLowerCase() === 'debug'){
		this.loggerRun.debug(form);
		if(this.consoleLog){
			this.consoleLog.debug(form);
		}
	}else if(level.toLowerCase() === 'info'){
		this.loggerRun.info(form);
		if(this.consoleLog){
			this.consoleLog.info(form);
		}
	}else if(level.toLowerCase() === 'warn'){
		this.loggerRun.warn(form);
		if(this.consoleLog){
			this.consoleLog.warn(form);
		}
	}else if(level.toLowerCase() === 'error'){
		this.loggerRun.error(form);
		if(this.consoleLog){
			this.consoleLog.error(form);
		}
	}
};

LogUtil.prototype.getNowTime = function(){
	 var nowDate = new Date();
	 return nowDate.toLocaleDateString() + ' ' + nowDate.toLocaleTimeString();
 };

module.exports = LogUtil;



