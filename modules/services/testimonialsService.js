var _ 				= 	require('lodash');
var Q 				=	require('q');
var testimonialModel= 	require('../models').testimonialModel;
var ec 				= 	require('../../constants').errors;
const lib 			=	require('../../lib');
const middlewares 	= 	lib.middlewares; 

 
 

var bannersServ = {
	 
	addReviewService: function(options,cb){
		if(!options || !options.reviewer_name || !options.reviewer_title || !options.reviewer_desc || !options.reviewer_rating )
			 return cb(ec.Error({status:ec.INSUFFICENT_DATA, message :"Invalid data to add Review"}));
			 
			options.reviewer_img = options.file.path;
			var newData = new testimonialModel(options); 
			newData.save(function(err, data){
				if(err)return cb(ec.Error({status:ec.DB_ERROR, message:"Unable Save Image."}));
				cb(null, data);
			}) 
		 
	} ,
	fetchReviewsService: function(options, cb){
		testimonialModel.find({}, function(err, data){
			if(err) return cb(ec.Error({status:ec.DB_ERROR, message:'Unable to fetch reviews'}));
			cb(null, data);
		})
	}
};
module.exports = bannersServ;