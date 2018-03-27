'use strict';

var addServices = require('../service/addsServices');
var _ = require('lodash');
 

var userCtrl = {
	addCtrl:function(req, res, next){
		var options = {};
		_.assign(options, req.body);
		addServices.addSignupService(options, function(err){
			if(err){
				return console.log("Erorr Ctrl")
			}
			 
			res.json({msg:"Added Successfully",data:options});
		})
	},
	getAdds: function(req, res, next){
		addServices.getAllAdds(function(err, data){
			res.json(data);
		})
	}
};

module.exports = userCtrl;