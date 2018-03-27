var _ 				= 	require('lodash');
var jwt				=	require('jsonwebtoken');
var Q 				=	require('q');
var countryModel 		= 	require('../models/countryModel');
var ec 				= 	require('../../../constants').errors;
const lib 			=	require('../../../lib');
const middlewares 	= 	lib.middlewares; 

var jwtSecret = '12233425werweertmivncusoskauridjfvnch';
 
function checkNewCountry(){
	var self = this;
	var deferred = Q.defer();
	countryModel.find({name:self.name}, function(err, data){
		if(err)
			return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to Fetch Country"}));
		if(data.length)
			 return deferred.reject(ec.Error({status:ec.DATA_ALREADY_EXISTS, message:'This country is already exist'}));
		deferred.resolve();
	});
	return deferred.promise;
}

function saveNewCountry(){
	var self = this;
	var deferred = Q.defer();
	let newCountry = countryModel(self);
	newCountry.save(function(err, result){
		if(err)
			return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to Save Country"}));
		self.newcountry = result;
		deferred.resolve();
	});
	return deferred.promise;
}


var userServ = {
	addCountryService:function(options, cb){

		 if(!options || !options.c_name || !options.c_code )
            return cb(ec.Error({status:ec.DB_ERROR, message :"Invalid data to create Country"}));

		checkNewCountry.call(options)
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

		 if(!options || !options.c_name || !options.c_code )
            return cb(ec.Error({status:ec.DB_ERROR, message :"Invalid data to create Country"}));

		fetchCountry.call(options)
            .then(updateCountry.bind(options)) 
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