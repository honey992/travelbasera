var _ 				= 	require('lodash');
var jwt				=	require('jsonwebtoken');
var Q 				=	require('q');
var countryModel 		= 	require('../models/countryModel');
var ec 				= 	require('../../constants').errors;
const lib 			=	require('../../lib');
const middlewares 	= 	lib.middlewares; 

var jwtSecret = '12233425werweertmivncusoskauridjfvnch';

var countryService = {

	getAllCountryService:function(options, cb){
		console.log('service options',options);
		if(!options)
            return cb(ec.Error({status:ec.DB_ERROR, message :"No data"}));

		countryModel.find({},function(err, data){
			if(err)
				return cb(ec.Error({status:ec.DB_ERROR, message :"Unable to Insert Country"}));
				cb(null,data);
		});
	},

	addCountryService:function(options, cb){
		console.log('service options',options);
		if(!options)
            return cb(ec.Error({status:ec.DB_ERROR, message :"Invalid data to create Country"}));

        var addcountry = new countryModel({c_name:options.c_name});
		addcountry.save(function(err, data){
			if(err)
				return cb(ec.Error({status:ec.DB_ERROR, message :"Unable to Insert Country"}));
				cb();
		});
	},
	
	editCountryService:function(options, cb){

		if(!options || !options.c_name || !options.c_code )
            return cb(ec.Error({status:ec.DB_ERROR, message :"Invalid data to create Country"}));

		countryModel.update({name:self.name}, function(err, data){
			if(err)
				return cb(ec.Error({status:ec.DB_ERROR, message:'Unable to Update User'}));
			cb(null, result);
		});
	},

	deleteCountryService: function(options, cb){
		
		countryModel.remove({_id:options.id}, function(err, result){
			if(err) return cb(ec.Error({status:ec.DB_ERROR, message:'Unable to get results'}));
			cb(null, result);
		});
	}
};
module.exports = countryService;