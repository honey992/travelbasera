var _ 				= 	require('lodash');
var jwt				=	require('jsonwebtoken');
var Q 				=	require('q');
var _models    	   = 	require('../models');
var stateModel     =  _models.stateModel;
var ec 				= 	require('../../constants').errors;
var lib 			=	require('../../lib');
var middlewares 	= 	lib.middlewares; 

function checkStateName(){
	var self = this;
	var deferred = Q.defer();
	self.s_code = 1;
	stateModel.find({s_name:self.name}, function(err, data){
		if(err) 
			return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to Fetch State"}));
		if(data.length)
			 return deferred.reject(ec.Error({status:ec.DATA_ALREADY_EXISTS, message:'State Already Exist.'}));
      	
      	deferred.resolve();
	});
	return deferred.promise; 
};
function fetchLastState(){
 	var self = this;
 	var deferred = Q.defer();
 	stateModel.find(function(err, data){
 		if(err)
 			return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to Fetch Role"}));
 		
 		if(data.length){
            var lastElm = data[data.length-1];
     		self.s_code = parseInt(lastElm.s_code)+1;
       } 
 		deferred.resolve();
 	});
 	return deferred.promise;
 }
function saveState(){
	var self = this;
	var deferred = Q.defer();
	console.log(self);
	 var rejObj = {s_name:self.name,s_code:self.s_code, c_id:self.country, 'metadata.is_active':self.status};
	var addstateData = new stateModel(rejObj);
		addstateData.save(function(err, data){
			if(err)
				return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to Insert State"}));
			deferred.resolve();
		});
	return deferred.promise;
}

function checkStateExist(){
	var self = this;
	var deferred = Q.defer();
	stateModel.find({_id:self._id}, function(err, data){
		if(err) 
			return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to Fetch State"}));
		if(data) 	deferred.resolve();
	});
	return deferred.promise; 
};

function updateStateData(){
	var self = this;
	var deferred = Q.defer();
	var updateData = {s_name:self.s_name, c_id:self.c_id, metadata:{is_active:self.metadata.is_active}};
	stateModel.update({_id:self._id},{$set:self}, function(err, data){
		if(err) 
			return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to Fetch State"}));
		if(data) 	
			deferred.resolve();
	});
	return deferred.promise; 
};


var stateService = {

	getStateService:function(options, cb){
	
		if(!options)
            return cb(ec.Error({status:ec.DB_ERROR, message :"No data"}));

		stateModel.find({},function(err, data){
			if(err)
				return cb(ec.Error({status:ec.DB_ERROR, message :"Unable to Fetch states"}));
				cb(null,data);
		});
	},

	addStateService:function(options, cb){
		
		if(!options)
            return cb(ec.Error({status:ec.DB_ERROR, message :"Invalid data to create State"}));

       checkStateName.call(options)
       		.then(fetchLastState.bind(options))
            .then(saveState.bind(options)) 
            .then(cb)
            .fail(failureCb)
            .catch(failureCb)

        function failureCb(err){
            var finalErr = new Error(err.message || 'Some Undefined Error Occurs.');
            finalErr.status = err.status || 400;
            return cb(finalErr);
        } 
	},
	
	updateStateService:function(options, cb){
debugger;
		if(!options)
            return cb(ec.Error({status:ec.DB_ERROR, message :"Invalid data to create State"}));

       checkStateExist.call(options)
            .then(updateStateData.bind(options)) 
            .then(cb)
            .fail(failureCb)
            .catch(failureCb)

        function failureCb(err){
            var finalErr = new Error(err.message || 'Some Undefined Error Occurs.');
            finalErr.status = err.status || 400;
            return cb(finalErr);
        } 
	},

	deleteStateService: function(options, cb){
		
		stateModel.remove({_id:options.id}, function(err, result){
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
	},
	stateByIdService: function(options, cb){ 
		stateModel.find({c_id:options.id}, function(err, result){
			if(err) return cb(ec.Error({status:ec.DB_ERROR, message:'Unable to get results'}));
			cb(null, result);
		});
	}
};
module.exports = stateService;

