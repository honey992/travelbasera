'use strict';

var categoryServices = require('../../services').categoryServices;
var _ = require('lodash');

var bannersCtrl = {

	addCategoryCtrl:function(req, res, next){
		var options = {file:{}}; 
		_.assign(options.file,req.file);
		_.assign(options, req.body); 
		categoryServices.addCategoryService(options, function(err, data){
			if(err) return next(err); 
			res.json({status:1,message:'Category Added Successfully'});
		})
	},
	getCategoryCtrl: function(req,res,next){
		var options = {};
		categoryServices.getCategoryService(options, function(err, result){
			if(err) return next(err); 
			res.json({data:result});
		})
	},
	updateBannerCtrl:function(req, res, next){
		var options = {file:{}};
		var filee = _.get(req, 'file');
		_.assign(options.file,filee);
		_.assign(options, req.body);
		categoryServices.updateBannerService(options, function(err, data){
			if(err) return next(err); 
			res.json({message:'Category Updated Successfully'});
		})
	},
	deleteBannersCtrl:function(req,res,next){
		var options = {};
		_.assign(options, req.params);
		categoryServices.deleteBanners(options, function(err, result){
			if(err) return next(err); 
			res.json({'status':1,'message':'Category Deleted Successfully'});
		})
	}
};

module.exports = bannersCtrl;