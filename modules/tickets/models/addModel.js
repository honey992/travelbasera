var db = require('../../../config/db');
//var mongoose = require('mongoose');

var userSchema = new db.Schema({
	name :{
		type:String
	},
	email :{
		type:String
	},
	password:{
		type:String
	},
	created_at:{
		type:Date
	}
});

module.exports = db.mongoose.model('adds', userSchema);