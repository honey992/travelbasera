var _ 				= 	require('lodash');
var Q 				=	require('q');
var _models 		= 	require('../models');
var packageModel    = _models.packageModel;
var rateModel       = _models.rateModel;
var imagesModel     = _models.imagesModel;
var itenaryModel   = _models.itenaryModel;
var ec 				= 	require('../../constants').errors;
var lib 			=	require('../../lib');
var middlewares 	= 	lib.middlewares; 

 function savePackageDetails(){
 	var deferred = Q.defer();
 	var self = this;
 	console.log(self)
 	var reqObj = {
 				'country':self.country,
 				'state':self.state,
 				'city':self.city,
 				'sourceCity':self.sourceCity,
 				'title':self.title,
 				'highlights':self.highlights,
 				'description':self.description,
 				'selectedInclusion':self.selectedInclusion
 };
 	var newPack = new packageModel(reqObj);
 	newPack.save(function(err, data){
 		if(err) return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to Save Package details"}));
 		self.packageId = data._id;
 		self.creator = data.metadata.created_by; 
 			deferred.resolve();
	});
	return deferred.promise; 
 
 }

  function savePackageRate(){
 	var deferred = Q.defer();
 	var self = this; 
 	//var reqObj = _.pick(self, ['package_id','package_rate','package_days','package_nights']);
 	var reqObj = {
 		'package_id':self.packageId,
 		'package_rate':self.rate,
 		'package_days':self.days,
 		'package_nights':self.nights,
 		'metadata.created_by' :self.creator
 	}
 	var newPackRates = new rateModel(reqObj);
 	newPackRates.save(function(err, data){
 		if(err) return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to Save Package rates"}));
         deferred.resolve();
	});
	return deferred.promise; 
 
 }

 function savePackageItenary(){
 	var deferred = Q.defer();
 	var self = this;
 	var reqObj = {
 		'package_id':self.packageId,
 		'package_intenary':self.itenary,
 		'metadata.created_by' :self.creator
 	};
 	var newPackItenary = new itenaryModel(reqObj);
 	newPackItenary.save(function(err, data){
 		if(err) return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to Save Package rates"}));
 		deferred.resolve();
 	});
 	return deferred.promise; 
 }
 
  function getPackageDetails(){
 	var deferred = Q.defer();
 	var self = this; 
 	var query = {};
 	if(self.hasOwnProperty('packageId')){ 
 		query = {_id:self.packageId};
 	} 
 	packageModel.find(query,function(err, data){
 		if(err) return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to Fetch Package details"}));
 		self.packages = {};
 		self.packages = data; 
		deferred.resolve();
	});
	return deferred.promise;  
 }
 
 function getOtherDetails(){
 	var deferred = Q.defer();
 	var self = this;
 	if(!self.hasOwnProperty('packageId')){ 
 		deferred.resolve();
 		return deferred.promise; 
 	} 
  	
	return deferred.promise;  
 }


var packageServ = {
	 
	addPackageService: function(options,cb){
		if(!options)
			 return cb(ec.Error({status:ec.INSUFFICENT_DATA, message :"Invalid data to add Package"}));
		savePackageDetails.call(options)
           //.then(savePackageImages.bind(options))
            .then(savePackageItenary.bind(options)) 
            .then(savePackageRate.bind(options)) 
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
		if(!options && !options.packId)
			return cb(ec.Error({status:ec.INSUFFICENT_DATA, message :"Insufficiant data to upload images."}));
		var reqObj = {
			package_images:[],
			package_id:options.packId || ''
		} 
		for(var k in options.files){
			reqObj.package_images.push(options.files[k].path);
		}; 
	   var newPackImages = new imagesModel(reqObj);
 	newPackImages.save(function(err, data){
 		if(err) return cb(ec.Error({status:ec.DB_ERROR, message :"Unable to Save Package images"}));
  			cb();
 			
	});
	},
	fetchPackagesService: function(options, cb){
		getPackageDetails.call(options)
            .then(getOtherDetails.bind(options)) 
            .then(cb)
            .fail(failureCb)
            .catch(failureCb) 
        function failureCb(err){
            var finalErr = new Error(err.message || 'Some Undefined Error Occurs.');
            finalErr.status = err.status || 400;
            return cb(finalErr);
        }  
	},
	getPackageDetailsService: function(options, cb){
		console.log(options);
	}
};
module.exports = packageServ;
