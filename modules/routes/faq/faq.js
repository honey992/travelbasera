'use strict';

var faqServices = require('../../services').faqService;
var _ = require('lodash');

var faqCtrl = {

	addFaqCtrl:function(req, res, next){
		var options = {}; 
		_.assign(options, req.body); 
		faqServices.addFaqService(options, function(err, data){
			if(err) return next(err); 
			res.json({status:1,message:'FAQs Added Successfully'});
		})
	},
	getFaqCtrl: function(req,res,next){
		var options = {};
		faqServices.getAllFaqService(options, function(err, result){
			if(err) return next(err); 
			res.json({data:result});
		})
	},
	updateFaqCtrl:function(req, res, next){
		var options = {};
		_.assign(options, req.body);
		faqServices.updateFaqService(options, function(err, data){
			if(err) return next(err); 
			res.json({message:'FAQs Updated Successfully'});
		})
	},
	deleteFaqCtrl:function(req,res,next){
		var options = {};
		_.assign(options, req.params);
		faqServices.deleteFaqService(options, function(err, result){
			if(err) return next(err); 
			res.json({'status':1,'message':'FAQs Deleted Successfully'});
		})
	}
};

module.exports = faqCtrl;