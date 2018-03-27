'use strict';

var countryServices = require('../service/countryService');
var _ = require('lodash');

var userCtrl = {

	addCountryCtrl:function(req, res, next){
		var options = {};
		_.assign(options, req.body);
		debugger;

		countryServices.addCountryService(options, function(err, data){
			if(err){
				return next(err);
			}
			debugger;
			res.json({message:'Country Saved Successfully', data:data});
		})
	},
	editCountryCtrl:function(req, res, next){
		var options = {};
		_.assign(options, req.body);
		countryServices.editCountryService(options, function(err, data){
			if(err){
				return next(err);
			}
		
			res.json({message:'Country Saved Successfully', data:data});
		})
	}
};

module.exports = userCtrl;