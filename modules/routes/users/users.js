'use strict';

var userServices = require('../../services').userServices;
var _ = require('lodash');

var usersCtrl = {

	registerUserCtrl: function(req, res, next){
		var options = {};
		_.assign(options, req.body);
		userServices.registerUserService(options, function(err, data){
			if(err) return next(err);
			res.json({ 'status':'S',data:'User Registered Successfully !!!'});
		})
	},
	loginUserCtrl: function(req,res,next){
		var options = {};
		_.assign(options, req.body)
	}
};

module.exports = usersCtrl;