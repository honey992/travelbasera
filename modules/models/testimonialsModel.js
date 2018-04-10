var db = require('../../config/db');
//var mongoose = require('mongoose');

var testimonialsSchema = new db.Schema({
	reviewer_name:{
		type:String,
		trim:true 
	},
	reviewer_img:{
		type:String,
		trim:true 
	},
	reviewer_title:{ 
		type:String,
		trim:true 
	},
	reviewer_desc:{
		type:String,
		trim:true 
	},
	reviewer_rating:{
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

testimonialsSchema.pre('save', function(next) {
    var currentDate = new Date();

    // change the updated_at field to current date
    this.metadata.modified_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.metadata.created_at) this.metadata.created_at = currentDate;
    next();
});
module.exports = db.mongoose.model('testimonials', testimonialsSchema);