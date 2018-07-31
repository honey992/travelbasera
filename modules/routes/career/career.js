'use strict';

var careerService = require('../../services').careerService;
var _ = require('lodash');

var categoryCtrl = {

	addOpeningCtrl:function(req, res, next){
		var options = {};  
		_.assign(options, req.body);  
		careerService.addNewOpening(options, function(err, data){
			if(err) return next(err);  
			res.json({status:1,message:'Category Added Successfully'});
		})
	},
	getOpeningCtrl: function(req,res,next){
		var options = {};
		careerService.getOpeningService(options, function(err, result){
			if(err) return next(err); 
			res.json({data:result});
		})
	},
	updateCategoryCtrl:function(req, res, next){
		var options = {file:{}};
		_.assign(options.file,req.file);
		_.assign(options, req.body);
		categoryServices.updateCategoryService(options, function(err, data){
			if(err) return next(err); 
			res.json({status:'S',message:'Category Updated Successfully'});
		})
	},
	deleteCategoryCtrl:function(req,res,next){
		var options = {};
		_.assign(options, req.params);
		categoryServices.deleteCategory(options, function(err, result){
			if(err) return next(err); 
			res.json({'status':1,'message':'Category Deleted Successfully'});
		})
	},
	_fetchCareersCtrl: function(req, res,next){
		var options = {};
		careerService._getCareerService(options, function(err, result){
			if(err) return next(err);
			res.json({'status':'S',data:result});

		})
	}
};

module.exports = categoryCtrl;