var _ 				= 	require('lodash');
var jwt				=	require('jsonwebtoken');
var Q 				=	require('q');
var userModel 		= 	require('../models/userModel');
var ec 				= 	require('../../constants').errors;
const lib 			=	require('../../lib');
const commonConf 			=	require('../../config/common');
const middlewares 	= 	lib.middlewares; 

var jwtSecret = commonConf.JWTKEY;
 
function checkEmailId(){
	var self = this;
	var deferred = Q.defer();
	userModel.find({email:self.email}, (err, data )=>{
		console.log(data)
		if(err) 
			return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to Fetch User"}));
		if(data.length)
			 return deferred.reject(ec.Error({status:ec.DATA_ALREADY_EXISTS, message:'The entered email id has already been registered.'}));
      	
      	deferred.resolve();

	});
	 return deferred.promise; 
}

function saveNewUser(){
	var self = this;
	var deferred = Q.defer(); 
	self.password = middlewares.cipher(self.password);
var status;
if(self.status == 'Yes') status = true;
else status = false;
	self.metadata= {is_active:status};
	var newUser = userModel(self)
	newUser.save((err, data)=>{
		if(err){
			console.log(err)
			return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to Register New User"}));
		}
		deferred.resolve();
	})
	return deferred.promise;
}


function findUserByEmail(){
	var self = this;
	var deferred = Q.defer();
	debugger;
	userModel.findOne({email:self.email}, function(err, data){
		debugger;
		if(err) 
			return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to get user by Email"}));
		if(!data)
			return deferred.reject(ec.Error({status:ec.UNAUTHORIZED_ACCESS, message :"Email/Password missmatched"}));
		debugger;
		self.matchedUser = data;
		deferred.resolve();
	});
	return deferred.promise; 
}


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

function checkPreviousPassword(){
	var self =this;
	var deferred  = Q.defer();
	userModel.findOne({_id:self._id}, function(err, data){
		if(err)
			return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to Fetch user "}));
		var decPassword = middlewares.decipher(data.password);
		if(decPassword === self.oldPassword){
			deferred.resolve();
		}else{
			deferred.reject(ec.Error({status:ec.UNAUTHORIZED_ACCESS, message :"Invalid Current Password"}));
		}
	});
	return deferred.promise;
};

function updatePassword(){
	var self = this;
	var deferred = Q.defer();
	var encPassword = middlewares.cipher(self.newPassword);
	userModel.update({_id:self._id}, {$set:{password:encPassword}}, function(err, data){
		if(err)
			return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to Update Password "}));
		deferred.resolve();
	});
	return deferred.promise;
}
 
// function getUserDetails(){
// 	var self = this;
// 	var deferred  = Q.defer();
// 	userModel.findOne({_id:self.id}, function(err, data){
// 		if(err)
// 			return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to Get User "}));
// 		if(!data)
// 			return deferred.reject(ec.Error({status:ec.NOT_FOUND, message :"No user found for this id"}));
// 		self.user = data;
// 		deferred.resolve();
// 	});
// 	return deferred.promise;
// }

// function updateUserDetails(){
// 	var self = this;
// 	var deferred = Q.defer();
// 	var uDetails = self.user;

// 	userModel.save({})
// }





var userServ = {
	userSignupService:function(options, cb){

		 if(!options || !options.firstname || !options.lastname || !options.email || !options.mobile )
            return cb(ec.Error({status:ec.INSUFFICENT_DATA, message :"Invalid data to create user"}));

		checkEmailId.call(options)
            .then(saveNewUser.bind(options)) 
            .then(cb)
            .fail(failureCb)
            .catch(failureCb)

        function failureCb(err){
            var finalErr = new Error(err.message || 'Some Undefined Error Occurs.');
            finalErr.status = err.status || 400;
            return cb(finalErr);
        } 
	},

	userLoginService: function(options, cb){
		if(!options || !options.email || !options.password)
            return cb(ec.Error({status:ec.INSUFFICENT_DATA, message :"Invalid data to login"}));

        findUserByEmail.call(options)
            .then(userLogin.bind(options)) 
            .then(cb)
            .fail(failureCb)
            .catch(failureCb)

        function failureCb(err){
            var finalErr = new Error(err.message || 'Some Undefined Error Occurs.');
            finalErr.status = err.status || 400;
            return cb(finalErr);
        } 

	},
	getAllUsers: function(options, cb){
		userModel.find({}, function(err, result){
			if(err) return cb(ec.Error({status:ec.DB_ERROR, message:'Unable to get results'}));
			cb(null, result);
		});
	},
	changePasswordService: function(options, cb){
		checkPreviousPassword.call(options)
            .then(updatePassword.bind(options)) 
            .then(cb)
            .fail(failureCb)
            .catch(failureCb)

        function failureCb(err){
            var finalErr = new Error(err.message || 'Some Undefined Error Occurs.');
            finalErr.status = err.status || 400;
            return cb(finalErr);
        } 
	},
	fetchUserByIdService: function(options, cb){
		userModel.findOne({_id:options.id}, function(err, result){
			if(err) return cb(ec.Error({status:ec.DB_ERROR, message:'Unable to get results'}));
			delete result.password;
			cb(null, result);
		});
	},
	userEditService: function(options, cb){
		 if(!options || !options.u)
            return cb(ec.Error({status:ec.INSUFFICENT_DATA, message :"Invalid data to update user"}));
		userModel.update({_id:options.id}, options.u, function(err, result){
			if(err)
				return cb(ec.Error({status:ec.DB_ERROR, message:'Unable to Update User'}));
			cb(null, result);
		}); 
	},
	deleteUserService: function(options, cb){
		debugger;
		userModel.remove({_id:options.id}, function(err, result){
			if(err) return cb(ec.Error({status:ec.DB_ERROR, message:'Unable to get results'}));
			debugger;
			cb(null, result);
		});
	},

};
module.exports = userServ;
