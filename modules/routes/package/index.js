'use strict';

var mongoose  = require('mongoose');
var packagesCtrl = require('./packages');
var lib 	   		= require('../../../lib');
var uploadFiles 	= lib.uploadFiles('ss');
var error 	 = require('../../error');


module.exports = function(app){

	app.route('/api/packages')
		.post(uploadFiles.multiUpload,packagesCtrl.addPackageCtrl, error)
		.get(packagesCtrl.getPackageCtrl, error)
	app.route('/api/uploadImages')
		.post(uploadFiles.multiUpload,packagesCtrl.uploadImagesCtrl, error)
	app.route('/api/fetchPackageDetail')
		.get(packagesCtrl.packDetailsCtrl, error)

//For Web
	app.route('/v1/api/packages/:cityId')
		.get(packagesCtrl._getPackagesByCity, error)


	 
}