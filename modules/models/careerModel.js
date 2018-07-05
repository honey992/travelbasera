var db = require('../../config/db');
//var mongoose = require('mongoose');

var careerSchema = new db.Schema({
	job_title:{
		type:String,
		trim:true
	},
	job_location:{
		type:String,
		trim:true
	},
	job_function:{
		type:String,
		trim:true
	},
	job_experience:{
		type:Number,
		trim:true
	},
	job_description:{
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

careerSchema.pre('save', function(next) {
    var currentDate = new Date();

    // change the updated_at field to current date
    this.metadata.modified_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.metadata.created_at) this.metadata.created_at = currentDate;
    next();
});
module.exports = db.mongoose.model('ADMIN_Careers', careerSchema);