'use strict';

var termAndConditionsServices = require('../../services').termAndConditionsService;
var _ = require('lodash');

var termAndConditionsCtrl = {

	addTermAndConditionsCtrl:function(req, res, next){
		var options = {};
		_.assign(options, req.body);

		termAndConditionsServices.addTermAndConditionService(options, function(err, data){
			if(err){
				return next(err);
			}
			res.json({'status':1,'message':'Terms and conditions Saved Successfully', data:data});
		})
	},
	getTermAndConditionsCtrl:function(req,res,next){
		var options = {};
		termAndConditionsServices.getTermAndConditionServices(options,function(err, result){
			if(err)	return next(err);

			res.json({data:result});
		});
	},
	updateTermAndConditionsCtrl:function(req, res, next){
		var options = {};
		_.assign(options, req.body);
		termAndConditionsServices.updateTermAndConditionService(options, function(err, data){
			if(err){
				return next(err);
			}
		
			res.json({'status':1,'message':'Terms and conditions Updated Successfully', data:data});
		})
	}
};

module.exports = termAndConditionsCtrl;