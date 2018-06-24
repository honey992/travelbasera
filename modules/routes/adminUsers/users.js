'use strict';

var adminUserServices = require('../../services').adminUsersServices;
var _ = require('lodash');

var userCtrl = {

	userSignupCtrl:function(req, res, next){
		var options = {};
		_.assign(options, req.body);
		adminUserServices.userSignupService(options, function(err, data){
			if(err){
				return next(err);
			}
			res.json({status:1, message:'User Created Successfully', data:data});
		})
	},

	userLoginCtrl: function(req, res, next){
		var options = {};
		_.assign(options, req.body);
		debugger;
		adminUserServices.userLoginService(options, function(err){
			if(err){
				console.log(err)
				return next(err);
			}
			debugger;
			res.json({status:1,message:'User Loggedin Successfully', token:options.token});
		})
	}, 
	getAllUsersCtrl: function(req, res, next){
		var options = {};
		adminUserServices.getAllUsers(options, function(err, data){
			if(err) return next(err);
			res.json({status:1, users:data});
		})
	},
	changePasswordCtrl: function(req,res,next){
		var options = {};
		_.assign(options, req.body);
		console.log(options);
		adminUserServices.changePasswordService(options, function(err, data){
			if(err) return next(err);
			res.json({status:1,message:'Password Changed Successfully'});
		})
	},
	fetchUserByIdCtrl: function(req,res,next){
		var options = {};
		_.assign(options, req.params);
		adminUserServices.fetchUserByIdService(options, function(err, data){
			if(err) return next(err);
			res.json({status:1,result:data});
		})
	},
	userEditCtrl: function(req,res,next){
		var options = {u:{}};
		_.assign(options, req.params);
		_.assign(options.u, req.body);
		delete req.body._id;
		adminUserServices.userEditService(options, function(err, data){
			if(err) return next(err);
			res.json({status:1,message:'User Updated Successfully'});
		})
	},
	deleteUserCtrl: function(req,res,next){
		var options = {};
		_.assign(options, req.params);
		debugger;
		adminUserServices.deleteUserService(options, function(err, data){
			if(err) return next(err);
			res.json({status:1,message:'User Deleted Successfully'});
		})
	}
	
};

module.exports = userCtrl;