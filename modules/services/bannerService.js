var _ 				= 	require('lodash');
var Q 				=	require('q');
var bannersModel    = 	require('../models').bannerModel;
var ec 				= 	require('../../constants').errors;
var lib 			=	require('../../lib');
var middlewares 	= 	lib.middlewares; 

 
 

var bannersServ = {
	 
	uploadBannerService: function(options,cb){
		if(!options)
            return cb(ec.Error({status:ec.DB_ERROR, message :"Invalid data to update Banner"}));
        var updatedData = options.file.path ? {cat_name:options.data.cat_name, cat_image :options.file.path, cat_desc : options.data.cat_desc, metadata:{is_active:options.data.metadata.is_active}} : {cat_name:options.data.cat_name, cat_desc : options.data.cat_desc, metadata:{is_active:options.data.metadata.is_active}};
		bannersModel.update({_id:options.data._id},{$set:updatedData}, function(err, data){
			if(err)
				return cb(ec.Error({status:ec.DB_ERROR, message:'Unable to Update Banner'}));
			cb(null, data);
		});
		 
	},
	getBanners: function(options, cb){
		bannersModel.find({}, function(err, data){
			if(err)return cb(ec.Error({status:ec.DB_ERROR, message:"Unable to get Banner"}));
			cb(null, data);
		})
	},
	deleteBanners: function(options, cb){
		console.log(options);
		debugger;
		bannersModel.remove({_id:options.id}, function(err, data){
		if(err)return cb(ec.Error({status:ec.DB_ERROR, message:"Unable to delete Banner"}));
		debugger;
			cb(null, data);

		})
	},
	_fetchBannerService: function(options, cb){
		bannersModel.find({'metadata.is_active':true}, function(err, data){
			if(err || !data) 
				return cb(ec.Error({status:ec.DB_ERROR, message:'Error to fetch banners'}));
			cb(null, data);
		})
	}
};
module.exports = bannersServ;
