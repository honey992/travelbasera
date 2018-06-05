var _ 				= 	require('lodash');
var Q 				=	require('q');
var testimonialModel= 	require('../models').testimonialModel;
var ec 				= 	require('../../constants').errors;
var lib 			=	require('../../lib');
var middlewares 	= 	lib.middlewares; 

 
 

var bannersServ = {
	 
	addReviewService: function(options,cb){
		if(!options || !options.reviewer_name || !options.reviewer_title || !options.reviewer_desc || !options.reviewer_rating )
			 return cb(ec.Error({status:ec.INSUFFICENT_DATA, message :"Invalid data to add Review"}));
			 
			options.reviewer_img = options.file.path;
			console.log('Review==', options);
			var newData = new testimonialModel(options); 
			newData.save(function(err, data){
				if(err)return cb(ec.Error({status:ec.DB_ERROR, message:"Unable Save Image."}));
				console.log('===', data);
				cb(null, data);
			}) 
		 
	} ,
	fetchReviewsService: function(options, cb){
		testimonialModel.find({}, function(err, data){
			if(err) return cb(ec.Error({status:ec.DB_ERROR, message:'Unable to fetch reviews'}));
			cb(null, data);
		})
	},
	deleteReviewsService:function(options, cb){
		testimonialModel.remove({_id:options.id}, function(err, data){
			if(err) return cb(ec.Error({status:ec.DB_ERROR, message:'Unable to delete reviews'}));
			cb(null, data);
		})
	}
};
module.exports = bannersServ;
