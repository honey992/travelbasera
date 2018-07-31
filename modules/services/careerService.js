var _ 				= 	require('lodash');
var Q 				=	require('q');
var careerModel    = 	require('../models').careerModel;
var ec 				= 	require('../../constants').errors;
var lib 			=	require('../../lib');
var middlewares 	= 	lib.middlewares; 


var careerServ = {
	 
	addNewOpening: function(options,cb){  
		if(!options)
            return cb(ec.Error({status:ec.DB_ERROR, message :"Invalid data"}));
         var newJob = new careerModel(options);
      newJob.save( function(err, data){
			if(err)return cb(ec.Error({status:ec.DB_ERROR, message:"Unable to add job."}));
			cb(null, data);
		})
		 
	},
	getOpeningService: function(options, cb){
		careerModel.find({}, function(err, data){
			if(err)return cb(ec.Error({status:ec.DB_ERROR, message:"Unable to get jobs"}));
			cb(null, data);
		})
	},
	
	updateCategoryService: function(options,cb){
		if(!options)
            return cb(ec.Error({status:ec.DB_ERROR, message :"Invalid data to update Category"}));
        var updatedData = options.file.path ? {cat_name:options.data.cat_name, cat_image :options.file.path, cat_desc : options.data.cat_desc, metadata:{is_active:options.data.metadata.is_active}} : {cat_name:options.data.cat_name, cat_desc : options.data.cat_desc, metadata:{is_active:options.data.metadata.is_active}};
		categoryModel.update({_id:options.data._id},{$set:updatedData}, function(err, data){
			if(err)
				return cb(ec.Error({status:ec.DB_ERROR, message:'Unable to Update Category'}));
			cb(null, data);
		});
	},

	deleteCategory: function(options, cb){
		categoryModel.remove({_id:options.id}, function(err, data){
		if(err)return cb(ec.Error({status:ec.DB_ERROR, message:"Unable to delete Categories"}));
			cb(null, data);

		})
	},
	_getCareerService: function(options, cb){
		 careerModel.find({'metadata.is_active':true}, function(err, data){
			if(err)return cb(ec.Error({status:ec.DB_ERROR, message:"Unable to jobs"}));
			cb(null, data);
		})
	}
};
module.exports = careerServ;
