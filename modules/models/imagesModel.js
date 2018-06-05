var db = require('../../config/db');
//var mongoose = require('mongoose');

var imagesSchema = new db.Schema({
	package_id:{
		type: db.Schema.Types.ObjectId ,ref: 'ADMIN_Packages'
	},
	package_mainImage:{
		type:String
	},
	package_images:[{
		type:String
	}],
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

imagesSchema.pre('save', function(next) { 
	var currentDate = new Date(); 
    this.metadata.modified_at = currentDate; 
    if (!this.metadata.created_at) this.metadata.created_at = currentDate; 
      
    next();
});

module.exports = db.mongoose.model('ADMIN_PackageImages', imagesSchema);