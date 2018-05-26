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
	getContactusCtrl:function(req,res,next){
		var options = {};
		contactServices.getContactusServices(options,function(err, result){
			if(err)	return next(err);

			res.json({data:result});
		});
	},
	updateContactusCtrl:function(req, res, next){
		var options = {};
		_.assign(options, req.body);
		console.log(req.body);
		contactServices.updateContactusService(options, function(err, data){
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