'use strict';

var mongoose  = require('mongoose');
var packagesCtrl = require('./packages');
var lib 	   		= require('../../../lib');
var uploadFiles 	= lib.uploadFiles('ss');
var error 	 = require('../../error');


module.exports = function(app){

	app.route('/api/packages')
		.post(packagesCtrl.addPackageCtrl, error)
	app.route('/api/uploadImages')
		.post(uploadFiles.upload,packagesCtrl.uploadImagesCtrl, error)


	 
}