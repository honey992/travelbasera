'use strict';

var cityServices = require('../../services').cityServices;
var _ = require('lodash');
var Q 	=	require('q');


var cityCtrl = {

 
	getCityCtrl: function(req, res, next){
		var options = {};
		cityServices.getCityService(options, function(err, data){
			if(err) return next(err);
			res.json({ status:1,cities:data});
		})
	},

	addCityCtrl:function(req, res, next){
		var options = {};
		_.assign(options, req.body);
 
		// var options = req.body;
		cityServices.addCityService(options, function(err, data){
			if(err){
				return next(err);
			}
 
			res.json({status:1,message:'City Saved Successfully'});
		})
	},

	updateCityCtrl:function(req, res, next){
		var options = {}; 
		_.assign(options, req.body);
		debugger;
		cityServices.updateCityService(options, function(err, data){
			if(err){
				return next(err);
			}
			res.json({'status':1, 'message':'City Updated Successfully'});
		})
	},

	deleteCityCtrl: function(req,res,next){
		var options = {};
		_.assign(options, req.params);
 
		console.log('delete options',options);
		cityServices.deleteCityService(options, function(err, data){
			if(err) return next(err);
			res.json({message:'City Deleted Successfully'});
		})
	},

 

	fetchCountryByIdCtrl: function(req,res,next){
		var options = {};
		_.assign(options, req.params);
		countryServices.fetchCountryByIdService(options, function(err, data){
			if(err) return next(err);
			res.json({result:data});
		})
	},

	fetchStateByIdCtrl: function(req,res,next){
		var options = {};
		_.assign(options, req.params);
		stateServices.fetchStateByIdService(options, function(err, data){
			if(err) return next(err);
			res.json({result:data});
		})
	},
	
	cityByIdCtrl: function(req,res,next){
		var options = {};
		_.assign(options, req.params);
		cityServices.cityByIdService(options, function(err, data){
			if(err) return next(err);
			res.json({'city':1,states:data});
		})
	}
};

module.exports = cityCtrl;