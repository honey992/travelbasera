'use strict';

var sendEmailServices = require('../../services').sendEmailServices;
var _ = require('lodash');

var sendEmailCtrl = {

	sendEmailCtrl:function(req, res, next){
		var options = {};
		_.assign(options, req.body);
		sendEmailServices.sendEmailService(options, function(err, data){
			if(err){
				return next(err);
			}
			res.json({message:'Email send Successfully', data:data});
		})
	}
};

module.exports = sendEmailCtrl;