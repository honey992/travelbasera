'use strict';
var bannerCtrl 		= require('./banners');
var mongoose   		= require('mongoose');
var lib 	   		= require('../../../lib');
var error 	 = require('../../error');
var uploadFiles 	= lib.uploadFiles('ss');


module.exports = function(app){

	app.route('/api/uploadBanners')
		.post(uploadFiles.upload, bannerCtrl.uploadBannerCtrl, error)
		.put(uploadFiles.upload, bannerCtrl.updateBannerCtrl, error) 
	app.route('/api/getBanners')
		.get( bannerCtrl.getBannersCtrl, error) 
	app.route('/api/uploadBanners/:id')
		.delete( bannerCtrl.deleteBannersCtrl, error) 
// API for web
	app.route('/v1/api/banners')
		.get(bannerCtrl._fetchBannerCtrl, error)
	 
}