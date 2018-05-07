var _ 				= 	require('lodash');
var Q 				=	require('q');
var bannersModel    = 	require('../models').bannerModel;
var ec 				= 	require('../../constants').errors;
const lib 			=	require('../../lib');
const middlewares 	= 	lib.middlewares; 

 
 

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
		// var img_data = {metadata:{}};
		// 	img_data.imageTitle = options.imageTitle;
		// 	img_data.metadata.status = options.status;
		// 	img_data.imageUrl = options.file.path;
		console.log(options);
		// var newData = bannersModel(img_data);
		// 	newData.update({_id:options._id},updateData,function(err, data){
		// 		if(err)return cb(ec.Error({status:ec.DB_ERROR, message:"Unable Save Image."}));
		// 		cb(null, data);
		// 	}) 
		 
	},
	deleteBanners: function(options, cb){
		console.log(options);
		debugger;
		bannersModel.remove({_id:options.id}, function(err, data){
		if(err)return cb(ec.Error({status:ec.DB_ERROR, message:"Unable to delete Banner"}));
		debugger;
			cb(null, data);

		})
	}
};
module.exports = bannersServ;