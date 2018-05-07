'use strict';

var cityServices = require('../../services').cityServices;
var _ = require('lodash');
var Q 	=	require('q');


var cityCtrl = {

	getAllCityCtrl: function(req, res, next){
		var options = {};
		cityServices.getAllCityService(options, function(err, data){
			if(err) return next(err);
			res.json({ city:data});
		})
	},

	addCityCtrl:function(req, res, next){
		var options = {};
		_.assign(options, req.body);
		var options = req.body;

		cityServices.addCityService(options, function(err, data){
			if(err){
				return next(err);
			}
			res.json({message:'City Saved Successfully'});
		})
	},

	editCityCtrl:function(req, res, next){
		var options = {}; 
		_.assign(options, req.body);
		cityServices.editCityService(options, function(err, data){
			if(err){
				return next(err);
			}
			res.json({'status':1, 'message':'City Updated Successfully'});
		})
	},

	deleteCityCtrl: function(req,res,next){
		var options = {};
		_.assign(options, req.params);
		cityServices.deleteCityService(options, function(err, data){
			if(err) return next(err);
			res.json({message:'City Deleted Successfully'});
		})
	},

	fetchCityByIdCtrl: function(req,res,next){
		var options = {};
		_.assign(options, req.params);
		cityServices.fetchCityByIdService(options, function(err, data){
			if(err) return next(err);
			res.json({result:data});
		})
	}
};

module.exports = cityCtrl;