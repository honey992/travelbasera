var _ 				= 	require('lodash');
var Q 				=	require('q');
var bannersModel    = 	require('../models').bannerModel;
var ec 				= 	require('../../constants').errors;
var lib 			=	require('../../lib');
var middlewares 	= 	lib.middlewares; 
var fs 				=	require('fs');

 
 

var bannersServ = {
	 
	uploadBannerService: function(options,cb){
		var img_data = {metadata:{}};
			img_data.imageTitle = options.imageTitle;
			img_data.metadata.status = options.status;
			img_data.imageUrl = options.file.path;
		var newData = bannersModel(img_data);
			newData.save(function(err, data){
				if(err)return cb(ec.Error({status:ec.DB_ERROR, message:"Unable Save Banner."}));
				cb(null, data);
			}) 
		 
	},
	getBanners: function(options, cb){
		bannersModel.find({}, function(err, data){
			if(err)return cb(ec.Error({status:ec.DB_ERROR, message:"Unable to get Banner"}));
			cb(null, data);
		})
	},
	updateBannerService: function(options,cb){
		if(!options)
            return cb(ec.Error({status:ec.DB_ERROR, message :"Invalid data to update Banner"}));
        var updatedData = options.file.path ? {imageTitle:options.data.imageTitle, imageUrl :options.file.path, metadata:{is_active:options.data.metadata.is_active}} : {imageTitle:options.data.imageTitle, metadata:{is_active:options.data.metadata.is_active}};
		bannersModel.update({_id:options.data._id},{$set:updatedData}, function(err, data){
			if(err)
				return cb(ec.Error({status:ec.DB_ERROR, message:'Unable to Update Banner'}));
			cb(null, data);
		});
		 
	},
	deleteBanners: function(options, cb){
		console.log(options);
		bannersModel.remove({_id:options.id}, function(err, data){
		if(err)return cb(ec.Error({status:ec.DB_ERROR, message:"Unable to delete Banner"}));
			else{
				fs.unlink(options.imgPath, function(err, res){
					cb(null, data);
				})
			}

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
