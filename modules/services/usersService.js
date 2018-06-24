var _ 				= 	require('lodash');
var jwt				=	require('jsonwebtoken');
var Q 				=	require('q');
var userModel 		= 	require('../models').userModel;
var ec 				= 	require('../../constants').errors;
const lib 			=	require('../../lib');
const commonConf 			=	require('../../config/common');
const middlewares 	= 	lib.middlewares; 

var jwtSecret = commonConf.JWTKEY;
  

function userLogin(){
	var self = this;
	var deferred = Q.defer();
	var user = self.matchedUser._doc;
	debugger;
	if(self.password == middlewares.decipher(user.password)){
		delete user.password;
		var token = jwt.sign(user, jwtSecret);
		debugger;
		self.token = token;
		deferred.resolve(); 
	} else{
		deferred.reject(ec.Error({status:ec.UNAUTHORIZED_ACCESS, message :"Email/Password missmatched"}));
	} 
	return deferred.promise;  
} 

function checkEmailId(){
	var self = this;
	var deferred = Q.defer();
	userModel.findOne({email:self.email}, function(err, data){
		if(err) return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to Fetch user by email"}));
		console.log('data', data)
		if(data)
			return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Email Id already exist."}));
		else 
			deferred.resolve();
	});
	return deferred.promise;
};

function registerNewUser(){
	var self = this;
	var deferred = Q.defer();
	self.password = middlewares.cipher(self.password);
	var newUser = new userModel(self);
	newUser.save(function(err, data){
		if(err)
			return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to register new user"}));
		deferred.resolve();
	});
	return deferred.promise;
}

var userServ = {
	registerUserService:function(options, cb){ 
		 if(!options || !options.firstname || !options.lastname || !options.email || !options.mobile )
            return cb(ec.Error({status:ec.INSUFFICENT_DATA, message :"Invalid data to create user"}));

		checkEmailId.call(options)
            .then(registerNewUser.bind(options)) 
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
