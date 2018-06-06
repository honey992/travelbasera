var _ 				= 	require('lodash');
var jwt				=	require('jsonwebtoken');
var Q 				=	require('q');
var _country     	= 	require('../models');
var countryModel    =  _country.countryModel;
var ec 				= 	require('../../constants').errors;
var lib 			=	require('../../lib');
var middlewares 	= 	lib.middlewares; 


function checkCountryName(){
	var self = this;
	var deferred = Q.defer();
	self.c_code = 1;
	countryModel.find({c_name:self.name}, function(err, data){
		if(err) 
			return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to Fetch Country"}));
		if(data.length)
			 return deferred.reject(ec.Error({status:ec.DATA_ALREADY_EXISTS, message:'Country Already Exist.'}));
      	
      	deferred.resolve();
	});
	return deferred.promise; 
};

function fetchLastCountry(){
 	var self = this;
 	var deferred = Q.defer();
 	countryModel.find(function(err, data){
 		if(err)
 			return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to Fetch Country"}));
 		
 		if(data.length){
            var lastElm = data[data.length-1];
     		self.c_code = parseInt(lastElm.c_code)+1;
       } 
 		deferred.resolve();
 	});
 	return deferred.promise;
 };

 function saveNewCountry(){
 	var self = this;
 	var deferred = Q.defer();
 	var addcountry = new countryModel({c_name:self.name, c_code:self.c_code,'metadata.is_active':self.status});
		addcountry.save(function(err, data){
			if(err)
				return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to Insert Country"}));
				deferred.resolve();
		});
 	return deferred.promise;
 }


var countryService = {

	getAllCountryService:function(options, cb){
	
		if(!options)
            return cb(ec.Error({status:ec.DB_ERROR, message :"No data"}));

		countryModel.find({},function(err, data){
			if(err)
				return cb(ec.Error({status:ec.DB_ERROR, message :"Unable to Fetch countries"}));
				cb(null,data);
		});
	},

	addCountryService:function(options, cb){
		
		if(!options)
            return cb(ec.Error({status:ec.DB_ERROR, message :"Invalid data to create Country"}));

       checkCountryName.call(options)
       		.then(fetchLastCountry.bind(options))
            .then(saveNewCountry.bind(options)) 
            .then(cb)
            .fail(failureCb)
            .catch(failureCb)

        function failureCb(err){
            var finalErr = new Error(err.message || 'Some Undefined Error Occurs.');
            finalErr.status = err.status || 400;
            return cb(finalErr);
        } 
	},
	
	editCountryService:function(options, cb){
		if(!options)
            return cb(ec.Error({status:ec.DB_ERROR, message :"Invalid data to create Country"}));
        var updateAbleData =  {  c_name:options.c_name, metadata:{is_active:options.metadata.is_active}};
		countryModel.update({_id:options._id},{$set:updateAbleData}, function(err, data){
			if(err)
				return cb(ec.Error({status:ec.DB_ERROR, message:'Unable to Update Country'}));
			cb(null, data);
		});
	},

	deleteCountryService: function(options, cb){
		
		countryModel.remove({_id:options.id}, function(err, result){
			if(err) return cb(ec.Error({status:ec.DB_ERROR, message:'Unable to delete Country'}));
			cb(null, result);
		});
	},

	fetchCountryByIdService: function(options, cb){
		
		countryModel.findOne({_id:options.id}, function(err, result){
			if(err) return cb(ec.Error({status:ec.DB_ERROR, message:'Unable to get results'}));
			delete result.id;
			cb(null, result);
		});
	}
};
module.exports = countryService;
