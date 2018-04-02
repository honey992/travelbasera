var db = require('../../../config/db');
//var mongoose = require('mongoose');

var rolesSchema = new db.Schema({
	r_name:{
		type:String
	},
	r_code:{
		type:String
	},
	is_active:{ 
		type:Boolean, 
		default: true 
	},
	created_at:{
		type :Date 
	}
});

module.exports = db.mongoose.model('roles', rolesSchema);