var db = require('../../config/db');
//var mongoose = require('mongoose');

var citySchema = new db.Schema({
	c_id:{
 
		type:String
	},
	s_id:{
		type:String
	},
	ci_name:{
		type:String
	},
	ci_code:{
		type:Number
	},
	ci_image:{

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

citySchema.pre('save', function(next) { 
	var currentDate = new Date(); 
    this.metadata.modified_at = currentDate; 
    if (!this.metadata.created_at) this.metadata.created_at = currentDate; 
 
      
    next();
});

module.exports = db.mongoose.model('ADMIN_City', citySchema);
