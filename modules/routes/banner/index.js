'use strict';
var bannerCtrl 		= require('./banners');
var mongoose   		= require('mongoose');
var lib 	   		= require('../../../lib');
var uploadFiles 	= lib.uploadFiles('ss');


module.exports = function(app){

	app.route('/api/uploadBanners')
		.post(uploadFiles.upload, bannerCtrl.uploadBannerCtrl) 
	app.route('/api/getBanners')
		.get( bannerCtrl.getBannersCtrl) 
	 
}