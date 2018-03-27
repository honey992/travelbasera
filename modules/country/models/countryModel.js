var db = require('../../../config/db');
//var mongoose = require('mongoose');

var countrySchema = new db.Schema({
	c_name:{
		type:String
	},
	c_code:{
		type:String
	},
	is_deleted:{ 
		type:Boolean, 
		default: false 
	},
	created_at:{
		type :Date 
	}
});

module.exports = db.mongoose.model('country', countrySchema);