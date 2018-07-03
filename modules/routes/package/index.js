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
	app.route('/api/packages/:id')
		.put(uploadFiles.multiUpload,packagesCtrl.updatePackageCtrl, error)
		.delete(packagesCtrl.deletePackageCtrl, error) 
	app.route('/api/removeImages/:id')
		.put(packagesCtrl.removeImageCtrl, error)

//For Web
	app.route('/v1/api/packages/:cityId')
		.get(packagesCtrl._getPackagesByCity, error) 
	app.route('/v1/api/package-details/:title')
		.get(packagesCtrl._getPackageDetailsCtrl, error)
	app.route('/v1/api/isPopularPackages')
		.get(packagesCtrl._getPopularPackagesCtrl, error)
	app.route('/v1/api/packageByCategory/:id')
		.get(packagesCtrl._getPackageByCategoryCtrl, error)
	app.route('/v1/api/search')
		.get(packagesCtrl._searchPackages, error)
	app.route('/v1/api/discounted')
		.get(packagesCtrl._getDiscountedPackages, error)
	 

	 
}