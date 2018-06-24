var db = require('../../config/db');
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
userSchema.pre('save', function(next) {
    var currentDate = new Date();

    // change the updated_at field to current date
    this.metadata.modified_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.metadata.created_at) this.metadata.created_at = currentDate;
    next();
});

module.exports = db.mongoose.model('users', userSchema);
