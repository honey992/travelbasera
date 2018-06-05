'use strict';

var packageServices = require('../../services').packageServices;
var _ = require('lodash');

var packCtrl = {

	addPackageCtrl:function(req, res, next){
		var options = {files:{}};  
		_.assign(options.files, req.files);
		_.assign(options, req.body); 
		packageServices.addPackageService(options, function(err, result){
			if(err){
				return next(err);
			}
			res.json({status:1, data:options});
		})
	},
	uploadImagesCtrl : function(req,res,next){
		var options = {files:{}}; 
		_.assign(options.files, req.files);
		_.assign(options, req.body); 
		packageServices.uploadImagesService(options, function(err, data){
			if(err) return next(err);
			res.json({status:1, message:'Package Saved Successfully'});
		})
	},
	getPackageCtrl: function(req, res, next){
		var options = {};
		_.assign(options, req.query);
		var fetchPackageFn = packageServices.fetchPackagesService
		 
		if(options.hasOwnProperty('packageId')){
			fetchPackageFn = packageServices.getPackageDetailsService;
		}

		fetchPackageFn(options, function(err, result){
			if(err) return next(err);
			if(options.hasOwnProperty('packageId')){
			res.json({data:result})
		}else{

			res.json({data:options})
		}
		})
	}, 
	packDetailsCtrl: function(req, res, next){
		var options = {};
		_.assign(options, req.query);
		packageServices.getPackageDetailsService(options, function(err, result){
			if(err) return next(err);
			res.json({data:options});
		})
	},
	deleteReviewsCtrl:function(req, res, next){
		var options = {};
		_.assign(options, req.params);
		testimonialServ.deleteReviewsService(options, function(err,result){
			if(err) return next(err);
			res.json({'status':1,message:'Package Deleted Successfully'});
		})
	}
};

module.exports = packCtrl;