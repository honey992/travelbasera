'use strict';

var aboutServices = require('../../services').aboutServices;
var _ = require('lodash');

var aboutCtrl = {

	addAboutCtrl:function(req, res, next){
		var options = {};
		_.assign(options, req.body);

		aboutServices.addAboutService(options, function(err, data){
			if(err){
				return next(err);
			}
			res.json({'status':1,'message':'About Saved Successfully', data:data});
		})
	},
	getAboutCtrl:function(req,res,next){
		var options = {};
		aboutServices.getAboutServices(options,function(err, result){
			if(err)	return next(err);

			res.json({data:result});
		});
	},
	updateAboutCtrl:function(req, res, next){
		var options = {};
		_.assign(options, req.body);
		aboutServices.updateAboutService(options, function(err, data){
			if(err){
				return next(err);
			}
		
			res.json({'status':1,'message':'About us Updated Successfully', data:data});
		})
	},
	deleteRolesCtrl:function(req, res, next){
		var options = {};
		_.assign(options, req.params);
		rolesServices.deleteRolesService(options, function(err, data){
			if(err){
				return next(err);
			}
		
			res.json({'status':1,'message':'About us Deleted Successfully', data:data});
		})
	}
};

module.exports = aboutCtrl;