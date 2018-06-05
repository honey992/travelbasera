var _ 				= 	require('lodash');
var jwt				=	require('jsonwebtoken');
var Q 				=	require('q');
var _model     		= 	require('../models');
var contactModel    =  _model.contactModel;
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


var contactServicex = {

	getContactusServices:function(options, cb){
	
		if(!options)
            return cb(ec.Error({status:ec.DB_ERROR, message :"Insufficient Data to fetch contact us"}));

		contactModel.findOne({},function(err, data){
			if(err)
				return cb(ec.Error({status:ec.DB_ERROR, message :"Unable to Fetch Contact us"}));
				cb(null,data);
		});
	},

	addContactService:function(options, cb){
		
		if(!options)
            return cb(ec.Error({status:ec.DB_ERROR, message :"Invalid data to save contacts"}));
        var reqObj = new contactModel(options);
        reqObj.save(function(err, data){
        	if(err)
				return cb(ec.Error({status:ec.DB_ERROR, message:'Unable to Save Contact'}));
			cb(null, data);
        });
        
	},
	
	updateContactusService:function(options, cb){
		if(!options)
            return cb(ec.Error({status:ec.DB_ERROR, message :"Invalid data to Update Contact us"}));
        var updateAbleData =  {  
        						contactno:options.contactno,
        						email:options.email,
        						address:options.address,
        						website:options.website, 
        						metadata:{is_active:options.metadata.is_active}
        					};
		contactModel.update({_id:options._id},{$set:updateAbleData}, function(err, data){
			if(err)
				return cb(ec.Error({status:ec.DB_ERROR, message:'Unable to Update Contacts'}));
			cb(null, data);
		});
	},

	deleteCountryService: function(options, cb){
		
		contactModel.remove({_id:options.id}, function(err, result){
			if(err) return cb(ec.Error({status:ec.DB_ERROR, message:'Unable to get results'}));
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
module.exports = contactServicex;
