var db = require('../../config/db');
//var mongoose = require('mongoose');

var countrySchema = new db.Schema({
	c_name:{
		type:String
	},
	c_code:{
		type:Number
	},
	metadata:{
		is_active:{ 
			type:Boolean, 
			default: true 
		},
		created_at:{
			type :Date 
		},
		modified_at:{
			type:Date
		}
	}
});

module.exports = db.mongoose.model('country', countrySchema);