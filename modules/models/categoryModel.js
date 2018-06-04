var db = require('../../config/db');
//var mongoose = require('mongoose');

var categorySchema = new db.Schema({ 
	cat_name:{
		type:String,
		trim:true
	},
	cat_code:{
		type:Number
	},
	cat_image:{

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

categorySchema.pre('save', function(next) {
    var currentDate = new Date();

    // change the updated_at field to current date
    this.metadata.modified_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.metadata.created_at) this.metadata.created_at = currentDate;
    next();
});
module.exports = db.mongoose.model('ADMIN_Category', categorySchema);