'use strict';

var stateServices = require('../../services').stateServices;
var _ = require('lodash');
var Q 	=	require('q');


var stateCtrl = {

	getAllCountryCtrl: function(req, res, next){
		var options = {};
		countryServices.getAllCountryService(options, function(err, data){
			if(err) return next(err);
			res.json({ country:data});
		})
	},

	addStateCtrl:function(req, res, next){
		var options = {};
		_.assign(options, req.body);
		var options = req.body;

		stateServices.addStateService(options, function(err, data){
			if(err){
				return next(err);
			}
			res.json({message:'State Saved Successfully'});
		})
	},

	editCountryCtrl:function(req, res, next){
		var options = {}; 
		_.assign(options, req.body);
		debugger;
		countryServices.editCountryService(options, function(err, data){
			if(err){
				return next(err);
			}
			res.json({'status':1, 'message':'Country Updated Successfully'});
		})
	},

	deleteCountryCtrl: function(req,res,next){
		var options = {};
		_.assign(options, req.params);
		console.log('delete options',options);
		countryServices.deleteCountryService(options, function(err, data){
			if(err) return next(err);
			res.json({message:'Country Deleted Successfully'});
		})
	},

	fetchCountryByIdCtrl: function(req,res,next){
		var options = {};
		_.assign(options, req.params);
		countryServices.fetchCountryByIdService(options, function(err, data){
			if(err) return next(err);
			res.json({result:data});
		})
	}
};

module.exports = stateCtrl;