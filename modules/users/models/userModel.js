var db = require('../../../config/db');
//var mongoose = require('mongoose');

var userSchema = new db.Schema({
	firstname :{
		type:String,
		required:true
	},
	lastname :{
		type:String
	},
	email:{
		type:String,
		required:true,
		trim:true
	},
	username:{
		type:String,
		required:true,
		trim:true
	},
	mobile:{
		type:String, 
		min:10, 
		max:10, 
		required:true 
	},
	password:{
		type:String,   
		required:true 
	},
	address:{
		type:String 
	},
	role:{
		type:String,
		default: 'Admin'
	},
	permissions:{
		type:Object
	},
	is_active:{ 
		type:Boolean, 
		default: false 
	},
	created_at:{
		type :Date 
	}
});

module.exports = db.mongoose.model('user', userSchema);