var _ 				= 	require('lodash');
var Q 				=	require('q');
var _models 		= 	require('../models');
var packageModel    = _models.packageModel;
var rateModel       = _models.rateModel;
var imagesModel     = _models.imagesModel;
var itenaryModel   = _models.itenaryModel;
var ec 				= 	require('../../constants').errors;
const lib 			=	require('../../lib');
const middlewares 	= 	lib.middlewares; 

 function savePackageDetails(){
 	var deferred = Q.defer();
 	var self = this;
 	console.log(self)
 	var reqObj = {
 				'country':self.country,
 				'state':self.state,
 				'city':self.city,
 				'sourceCity':self.sourceCity
 };
 	var newPack = new packageModel(reqObj);
 	newPack.save(function(err, data){
 		if(err) return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to Save Package details"}));
 		self.packageId = data._id; 
 			deferred.resolve();
	});
	return deferred.promise; 
 
 }

  function savePackageImages(){
 	var deferred = Q.defer();
 	var self = this;
 	console.log(self)
 	var reqObj = {
 				'country':self.data.country,
 				'state':self.data.state,
 				'city':self.data.city,
 				'sourceCity':self.data.sourceCity
    };
 	var newPack = new packageModel(reqObj);
 	newPack.save(function(err, data){
 		if(err) return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to Save Package details"}));
 		self.packageId = data._id;
 			deferred.resolve();
	});
	return deferred.promise; 
 
 }
 

var packageServ = {
	 
	addPackageService: function(options,cb){
		if(!options)
			 return cb(ec.Error({status:ec.INSUFFICENT_DATA, message :"Invalid data to add Package"}));
		savePackageDetails.call(options)
           // .then(savePackageImages.bind(options))
            // .then(savePackageItenary.bind(options)) 
            // .then(savePackageRate.bind(options)) 
            .then(cb)
            .fail(failureCb)
            .catch(failureCb)

        function failureCb(err){
            var finalErr = new Error(err.message || 'Some Undefined Error Occurs.');
            finalErr.status = err.status || 400;
            return cb(finalErr);
        }    
	} , 
	uploadImagesService: function(options, cb){
		if(!options)
			return cb(ec.Error({status:ec.INSUFFICENT_DATA, message :"Unable to upload images."}));
		console.log(options);
	}
};
module.exports = packageServ;