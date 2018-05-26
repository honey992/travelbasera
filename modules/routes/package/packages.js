'use strict';

var packageServices = require('../../services').packageServices;
var _ = require('lodash');

var packCtrl = {

	addPackageCtrl:function(req, res, next){
		var options = {};  
		_.assign(options, req.file);
		_.assign(options, req.body); 
		packageServices.addPackageService(options, function(err, result){
			if(err){
				return next(err);
			}
			res.json({status:1, data:options});
		})
	},
	uploadImagesCtrl : function(req,res,next){
		var options = {};
		_.assign(options, req.file);
		_.assign(options, req.body);
		console.log("imaaaaaaaa=", options);
		packageServices.uploadImagesService(options, function(err, data){
			if(err) return next(err);
			res.json({status:1, message:'Package Saved Successfully'});
		})
	},
	getReviewsCtrl: function(req, res, next){
		var options = {};
		testimonialServ.fetchReviewsService(options, function(err, result){
			if(err) return next(err);
			res.json({data:result})
		})
	}, 
	fetchReviewsByIdCtrl: function(req, res, next){
		var options = {};
		_.assign(options, req.params);
		testimonialServ.fetchReviewsByIdServ(options, function(err,result){
			if(err) return next(err);
			res.json({data:result});
		})
	},
	deleteReviewsCtrl:function(req, res, next){
		var options = {};
		_.assign(options, req.params);
		testimonialServ.deleteReviewsService(options, function(err,result){
			if(err) return next(err);
			res.json({'status':1,message:'Review Deleted Successfully'});
		})
	}
};

module.exports = packCtrl;