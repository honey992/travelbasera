'use strict';

var testimonialServ = require('../../services').testimonialsServices;
var _ = require('lodash');

var reviewCtrl = {

	addReviewCtrl:function(req, res, next){
		var options = {file:{}};
		var filee = _.get(req, 'file');
		_.assign(options.file,filee);
		_.assign(options, req.body);
		
		testimonialServ.addReviewService(options, function(err, data){
			if(err){
				return next(err);
			}
			res.json({message:'Review Saved Successfully', data:data});
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
	}
};

module.exports = reviewCtrl;