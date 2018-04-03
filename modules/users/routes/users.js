'use strict';

var userServices = require('../service/usersServices');
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
		userServices.userLoginService(options, function(err){
			if(err){
				return next(err);
			}
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
	}
};

module.exports = userCtrl;