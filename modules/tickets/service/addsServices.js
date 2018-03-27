var _ = require('lodash');
var addModel = require('../models/addModel');

var userServ = {
	addSignupService:function(options, cb){ 
		var newAdd = new addModel(options);
		newAdd.save(function(err, data){
			if(err) {
				return cb(err);
			}
			cb(null, data);
		})
	},
	getAllAdds: function(cb){
		addModel.find({}, function(err, data){
			if(err){
				return cb(err);
			}
			cb(null, data);
		})
	}
};
module.exports = userServ;