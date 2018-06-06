var db = require('../../config/db');
//var mongoose = require('mongoose');

var packageSchema = new db.Schema({
	category:{
		type:String
	},
	type:{
		type:String
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
		type:String,
		unique:true,
		trim:true
	}, 
	highlights:[{
		title:{type:String} 
	}],
	description:{
		type:String
	},
	selectedInclusion:[{
		i_name:{type:String},
		i_code:{type:String}
	}],
	imagesId:{
		type: db.Schema.Types.ObjectId ,ref: 'admin_packageimages'
	},
	rateId:{
		type: db.Schema.Types.ObjectId ,ref: 'admin_rates'
	},
	itenaryId:{
		type: db.Schema.Types.ObjectId ,ref: 'admin_itenaries'
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

packageSchema.pre('save', function(next) { 
	debugger;
	var currentDate = new Date(); 
    this.metadata.modified_at = currentDate; 
    if (!this.metadata.created_at) this.metadata.created_at = currentDate; 
      
    next();
});

module.exports = db.mongoose.model('ADMIN_Packages', packageSchema);