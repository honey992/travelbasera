var _ 				= 	require('lodash');
var jwt				=	require('jsonwebtoken');
var Q 				=	require('q');
var userModel 		= 	require('../models/userModel');
var ec 				= 	require('../../../constants').errors;
const lib 			=	require('../../../lib');
const middlewares 	= 	lib.middlewares; 

var jwtSecret = '12233425werweertmivncusoskauridjfvnch';
 
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
	let self = this;
	let deferred = Q.defer();
	self.password = middlewares.cipher(self.password);
	let newUser = userModel(self)
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
	let self = this;
	let deferred = Q.defer();
	userModel.findOne({email:self.email}, function(err, data){
		if(err) 
			return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to get user by Email"}));
		if(!data)
			return deferred.reject(ec.Error({status:ec.NOT_FOUND, message :"Email/Password missmatched"}));
		self.matchedUser = data;
		deferred.resolve();
	});
	return deferred.promise; 
}


function userLogin(){
	let self = this;
	let deferred = Q.defer();
	let user = self.matchedUser._doc;
	if(self.password == middlewares.decipher(user.password)){
		var token = jwt.sign(user, jwtSecret);
		self.token = token;
		deferred.resolve(); 
	} else{
		deferred.reject(ec.Error({status:ec.NOT_FOUND, message :"Email/Password missmatched"}));
	}
	
	return deferred.promise; 

}
 

var userServ = {
	userSignupService:function(options, cb){

		 if(!options || !options.firstname || !options.lastname || !options.email || !options.mobile )
            return cb(ec.Error({status:ec.DB_ERROR, message :"Invalid data to create user"}));

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
            return cb(ec.Error({status:ec.DB_ERROR, message :"Invalid data to login"}));

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
			if(err) return cb(ec.Error({status:404, message:'Unable to get results'}));
			cb(null, result);
		});
	}
};
module.exports = userServ;