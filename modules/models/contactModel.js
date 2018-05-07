var db = require('../../config/db');
//var mongoose = require('mongoose');

var contactSchema = new db.Schema({
	contactno:{
		type:Number
	},
	email:{
		type:String
	},
	address:{
		type:String
	},
	website:{
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
		created_by:{
			name:{
				type:String
			},
			id:{
				type:String
			}
		},
		modified_at:{
			type:Date
		}
	}
});

contactSchema.pre('save', function(next) { 
	var currentDate = new Date(); 
    this.metadata.modified_at = currentDate; 
    if (!this.metadata.created_at) this.metadata.created_at = currentDate; 
      
    next();
});

module.exports = db.mongoose.model('contactdetails', contactSchema);