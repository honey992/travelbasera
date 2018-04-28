'use strict';

var userServices = require('../../services').usersServices;
var _ = require('lodash');

var userCtrl = {

	userSignupCtrl:function(req, res, next){
		var options = {};
		_.assign(options, req.body);
		userServices.userSignupService(options, function(err, data){
			if(err){
				return next(err);
			}
			res.json({message:'User Created Successfully', data:data});
		})
	},

	userLoginCtrl: function(req, res, next){
		var options = {};
		_.assign(options, req.body);
		debugger;
		userServices.userLoginService(options, function(err){
			if(err){
				console.log(err)
				return next(err);
			}
			debugger;
			res.json({message:'User Loggedin Successfully', token:options.token});
		})
	}, 
	getAllUsersCtrl: function(req, res, next){
		var options = {};
		userServices.getAllUsers(options, function(err, data){
			if(err) return next(err);
			res.json({ users:data});
		})
	},
	changePasswordCtrl: function(req,res,next){
		var options = {};
		_.assign(options, req.body);
		console.log(options);
		userServices.changePasswordService(options, function(err, data){
			if(err) return next(err);
			res.json({message:'Password Changed Successfully'});
		})
	},
	fetchUserByIdCtrl: function(req,res,next){
		var options = {};
		_.assign(options, req.params);
		userServices.fetchUserByIdService(options, function(err, data){
			if(err) return next(err);
			res.json({result:data});
		})
	},
	userEditCtrl: function(req,res,next){
		var options = {u:{}};
		_.assign(options, req.params);
		_.assign(options.u, req.body);
		delete req.body._id;
		userServices.userEditService(options, function(err, data){
			if(err) return next(err);
			res.json({message:'User Updated Successfully'});
		})
	},
	deleteUserCtrl: function(req,res,next){
		var options = {};
		_.assign(options, req.params);
		debugger;
		userServices.deleteUserService(options, function(err, data){
			if(err) return next(err);
			res.json({message:'User Deleted Successfully'});
		})
	}
	
};

module.exports = userCtrl;