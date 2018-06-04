var _ 				= 	require('lodash');
var jwt				=	require('jsonwebtoken');
var Q 				=	require('q');
var _models    	   = 	require('../models');
var inclusionModel     =  _models.inclusionModel;
var ec 				= 	require('../../constants').errors;
var lib 			=	require('../../lib');
var middlewares 	= 	lib.middlewares; 

function checkInclusion(){
	var self = this;
	var deferred = Q.defer();
	self.i_code = 1;
	inclusionModel.find({i_name:self.i_name}, function(err, data){
		if(err) 
			return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to Fetch Inclusion"}));
		if(data.length)
			 return deferred.reject(ec.Error({status:ec.DATA_ALREADY_EXISTS, message:'Inclusion Already Exist.'}));
      	
      	deferred.resolve();
	});
	return deferred.promise; 
};

function fetchLastInclusion(){
 	var self = this;
 	var deferred = Q.defer();
 	inclusionModel.find(function(err, data){
 		if(err)
 			return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to Fetch Inclusion"}));
 		
 		if(data.length){
            var lastElm = data[data.length-1];
     		self.i_code = parseInt(lastElm.i_code)+1;
       } 
 		deferred.resolve();
 	});
 	return deferred.promise;
 }
function saveInclusion(){
	var self = this;
	var deferred = Q.defer();
	console.log(self);
	 var reqObj = {i_name:self.i_name,i_code:self.i_code, i_icon:self.file.path, 'metadata.is_active':self.status};
	 
	var addIncData = new inclusionModel(reqObj);
		addIncData.save(function(err, data){
			if(err)
				return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to Insert Inclusion"}));
			deferred.resolve();
		});
	return deferred.promise;
}

function checkStateExist(){
	var self = this;
	var deferred = Q.defer();
	inclusionModel.find({_id:self._id}, function(err, data){
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
	inclusionModel.update({_id:self._id},{$set:self}, function(err, data){
		if(err) 
			return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to Fetch State"}));
		if(data) 	
			deferred.resolve();
	});
	return deferred.promise; 
};


var countryService = {

	getInclusionService:function(options, cb){
	
		if(!options)  return cb(ec.Error({status:ec.DB_ERROR, message :"No data"}));

		inclusionModel.find({},function(err, data){
			if(err)
				return cb(ec.Error({status:ec.DB_ERROR, message :"Unable to Fetch Inclusions"}));
				cb(null,data);
		});
	},

	addInclusionService:function(options, cb){
		
		if(!options)
            return cb(ec.Error({status:ec.DB_ERROR, message :"Invalid data to create State"}));

       checkInclusion.call(options)
       		.then(fetchLastInclusion.bind(options))
            .then(saveInclusion.bind(options)) 
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

	deleteInclusionService: function(options, cb){
		
		inclusionModel.remove({_id:options.id}, function(err, result){
			if(err) return cb(ec.Error({status:ec.DB_ERROR, message:'Unable to Delete Results'}));
			cb(null, result);
		});
	},

	fetchCountryByIdService: function(options, cb){
		
		inclusionModel.findOne({_id:options.id}, function(err, result){
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
module.exports = countryService;
