var _ 				= 	require('lodash');
var Q 				=	require('q');
var bannersModel    = 	require('../models');
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
				if(err)return cb(ec.Error({status:ec.DB_ERROR, message:"Unable Save Image."}));
				cb(null, data);
			}) 
		 
	},
	getBanners: function(options, cb){
		bannersModel.find({}, function(err, data){
			if(err)return cb(ec.Error({status:ec.DB_ERROR, message:"Unable to get Images"}));
			cb(null, data);
		})
	} 
};
module.exports = bannersServ;