'use strict';

var bannerServices = require('../../services').bannerServices;
var _ = require('lodash');

var bannersCtrl = {

	uploadBannerCtrl:function(req, res, next){
		var options = {file:{}};
		var filee = _.get(req, 'file');
		_.assign(options.file,filee);
		_.assign(options, req.body);
		bannerServices.uploadBannerService(options, function(err, data){
			if(err) return next(err); 
			res.json({message:'Banner Uploaded Successfully'});
		})
	},
	getBannersCtrl: function(req,res,next){
		var options = {};
		bannerServices.getBanners(options, function(err, result){
			if(err) return next(err); 
			res.json({data:result});
		})
	},
	updateBannerCtrl:function(req, res, next){
		var options = {file:{}};
		var filee = _.get(req, 'file');
		_.assign(options.file,filee);
		_.assign(options, req.body);
		bannerServices.updateBannerService(options, function(err, data){
			if(err) return next(err); 
			res.json({message:'Banner Updated Successfully'});
		})
	},
	deleteBannersCtrl:function(req,res,next){
		var options = {};
		_.assign(options, req.params);
		bannerServices.deleteBanners(options, function(err, result){
			if(err) return next(err); 
			res.json({'status':1,'message':'Banner Deleted Successfully'});
		})
	}
};

module.exports = bannersCtrl;