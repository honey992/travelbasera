'use strict';

var stateServices = require('../../services').stateServices;
var _ = require('lodash');
var Q 	=	require('q');


var stateCtrl = {

	getStateCtrl: function(req, res, next){
		var options = {};
		stateServices.getStateService(options, function(err, data){
			if(err) return next(err);
			res.json({ status:1,states:data});
		})
	},

	addStateCtrl:function(req, res, next){
		var options = {};
		_.assign(options, req.body);
		// var options = req.body;
		stateServices.addStateService(options, function(err, data){
			if(err){
				return next(err);
			}
			res.json({status:1,message:'State Saved Successfully'});
		})
	},

	updateStateCtrl:function(req, res, next){
		var options = {}; 
		_.assign(options, req.body);
		debugger;
		stateServices.updateStateService(options, function(err, data){
			if(err){
				return next(err);
			}
			res.json({'status':1, 'message':'Country Updated Successfully'});
		})
	},

	deleteStateCtrl: function(req,res,next){
		var options = {};
		_.assign(options, req.params);
		console.log('delete options',options);
		stateServices.deleteStateService(options, function(err, data){
			if(err) return next(err);
			res.json({message:'State Deleted Successfully'});
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
	
	stateByIdCtrl: function(req,res,next){
		var options = {};
		_.assign(options, req.params);
		stateServices.stateByIdService(options, function(err, data){
			if(err) return next(err);
			res.json({'status':1,states:data});
		})
	},
	_statesByCountry: function(req,res,next){
		var options = {};
		stateServices.getAllStatesService(options, function(err, result){
			if(err) return next(err);
			res.json({'status':'S', data:result});
		});
	}
};

module.exports = stateCtrl;