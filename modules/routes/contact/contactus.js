'use strict';

var contactServices = require('../../services').contactServices;
var _ = require('lodash');

var rolesCtrl = {

	addContactusCtrl:function(req, res, next){
		var options = {};
		_.assign(options, req.body);

		contactServices.addContactService(options, function(err, data){
			if(err){
				return next(err);
			}
			res.json({'status':1,'message':'Contacts Saved Successfully', data:data});
		})
	},
	getRolesCtrl:function(req,res,next){
		var options = {};
		contactServices.getAllRolesServices(options,function(err, result){
			if(err)	return next(err);

			res.json({data:result});
		});
	},
	updateRolesCtrl:function(req, res, next){
		var options = {};
		_.assign(options, req.body);
		contactServices.updateRolesService(options, function(err, data){
			if(err){
				return next(err);
			}
		
			res.json({'status':1,'message':'Role Updated Successfully', data:data});
		})
	},
	deleteRolesCtrl:function(req, res, next){
		var options = {};
		_.assign(options, req.params);
		contactServices.deleteRolesService(options, function(err, data){
			if(err){
				return next(err);
			}
		
			res.json({'status':1,'message':'Role Deleted Successfully', data:data});
		})
	}
};

module.exports = rolesCtrl;