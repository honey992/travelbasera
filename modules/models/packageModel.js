var db = require('../../config/db');
//var mongoose = require('mongoose');

var packageSchema = new db.Schema({
	category:{
		type:Number
	},
	country:{
		type:String
	},
	state:{
		type:String
	},
	city:{
		type:String
	}, 
	sourceCity:{
		type:String
	},
	title:{
		type:String
	}, 
	highlights:[{
		title:{
		type:String
	}
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

packageSchema.pre('save', function(next) { 
	var currentDate = new Date(); 
    this.metadata.modified_at = currentDate; 
    if (!this.metadata.created_at) this.metadata.created_at = currentDate; 
      
    next();
});

module.exports = db.mongoose.model('ADMIN_Packages', packageSchema);