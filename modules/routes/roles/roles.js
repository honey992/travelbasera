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
	updateRolesCtrl:function(req, res, next){
		var options = {};
		_.assign(options, req.body);
		rolesServices.updateRolesService(options, function(err, data){
			if(err){
				return next(err);
			}
		
			res.json({'status':1,'message':'Role Updated Successfully', data:data});
		})
	},
	deleteRolesCtrl:function(req, res, next){
		var options = {};
		_.assign(options, req.params);
		rolesServices.deleteRolesService(options, function(err, data){
			if(err){
				return next(err);
			}
		
			res.json({'status':1,'message':'Role Deleted Successfully', data:data});
		})
	}
};

module.exports = rolesCtrl;