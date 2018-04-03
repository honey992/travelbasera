'use strict';

var rolesServices = require('../../services').roleServices;
var _ = require('lodash');

var rolesCtrl = {

	addRolesCtrl:function(req, res, next){
		var options = {};
		_.assign(options, req.body);

		rolesServices.addRolesService(options, function(err, data){
			if(err){
				return next(err);
			}
			res.json({message:'Role Saved Successfully', data:data});
		})
	},
	getRolesCtrl:function(req,res,next){
		var options = {};
		rolesServices.getAllRolesServices(options,function(err, result){
			if(err)	return next(err);

			res.json({data:result});
		});
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

module.exports = rolesCtrl;