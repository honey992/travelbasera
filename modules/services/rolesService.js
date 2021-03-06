var _ 				= 	require('lodash');
var Q 				=	require('q');
var rolesModel 		= 	require('../models/rolesModel');
var ec 				= 	require('../../constants').errors;
var lib 			=	require('../../lib');
var middlewares 	= 	lib.middlewares; 

 
 function checkNewRole(){
 	var self = this;
 	var deferred = Q.defer();
 	self.r_code = '1';
 	rolesModel.find({r_name:self.r_name}, function(err, data){
 		if(err)
 			return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to Fetch Role"}));
 		if(data.length)
 			return deferred.reject(ec.Error({status:ec.DATA_ALREADY_EXISTS, message :"Role Already exist"}));
 		deferred.resolve();

 	});
 	return deferred.promise;
 }
 
 function fetchAllRoles(){
 	var self = this;
 	var deferred = Q.defer();
 	rolesModel.find(function(err, data){
 		if(err)
 			return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to Fetch Role"}));
 		
 		if(data.length){
            var lastElm = data[data.length-1];
     		self.r_code = parseInt(lastElm.r_code)+1;
       } 
 		deferred.resolve();
 	});
 	return deferred.promise;
 }

 function saveNewRoles(){
 	var self = this;
 	var deferred = Q.defer();
 	
 	var newRole = new rolesModel(self);
 	newRole.save(function(err, result){
 		if(err)
 			return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to Save Role"}));
 		deferred.resolve();

 	});
 	return deferred.promise;
 }

 function fetchRole(){
    var self = this;
    var deferred = Q.defer();
    rolesModel.find({_id:self._id}, function(err, data){
     if(err)
            return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to Fetch Role"}));
        deferred.resolve();

    });
    return deferred.promise;
 }

function updateRole(){
    var self = this;
    var deferred = Q.defer();
    var updateData = {r_name:self.r_name, metadata:{is_active:self.metadata.is_active}};
    rolesModel.update({_id:self._id},{$set:self}, function(err, data){
        if(err) 
            return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to Update Roles"}));
        if(data)    
            deferred.resolve();
    });
    return deferred.promise; 
};

function deleteRole(){
    var self = this;
    var deferred = Q.defer();
    rolesModel.remove({_id:self.id}, function(err, data){
     if(err) 
            return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to Update Roles"}));
        if(data)    
            deferred.resolve();
    });
    return deferred.promise; 
};

var userServ = {
	addRolesService:function(options, cb){

		 if(!options || !options.r_name)
            return cb(ec.Error({status:ec.INSUFFICENT_DATA, message :"Invalid data to create Role"}));

		checkNewRole.call(options)
			.then(fetchAllRoles.bind(options))
            .then(saveNewRoles.bind(options)) 
            .then(cb)
            .fail(failureCb)
            .catch(failureCb)

        function failureCb(err){
            var finalErr = new Error(err.message || 'Some Undefined Error Occurs.');
            finalErr.status = err.status || 400;
            return cb(finalErr);
        } 
	},
	getAllRolesServices: function(options,cb){
		rolesModel.find( function(err, data){
			if(err) return cb(ec.Error({status:ec.DB_ERROR, message:"Unable to get roles."}));
				cb(null, data);
		})
	},
		updateRolesService:function(options, cb){

		 if(!options || !options.r_name )
            return cb(ec.Error({status:ec.DB_ERROR, message :"Invalid data to update Role"}));

		fetchRole.call(options)
            .then(updateRole.bind(options)) 
            .then(cb)
            .fail(failureCb)
            .catch(failureCb)

        function failureCb(err){
            var finalErr = new Error(err.message || 'Some Undefined Error Occurs.');
            finalErr.status = err.status || 400;
            return cb(finalErr);
        } 
	},
    deleteRolesService:function(options, cb){

         if(!options  )
            return cb(ec.Error({status:ec.DB_ERROR, message :"Invalid data to delete Role"}));

        fetchRole.call(options)
            .then(deleteRole.bind(options)) 
            .then(cb)
            .fail(failureCb)
            .catch(failureCb)

        function failureCb(err){
            var finalErr = new Error(err.message || 'Some Undefined Error Occurs.');
            finalErr.status = err.status || 400;
            return cb(finalErr);
        } 
    }
};
module.exports = userServ;
