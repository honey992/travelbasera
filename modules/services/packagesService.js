var _ 				= 	require('lodash');
var Q 				=	require('q');
var mongoose 				=	require('mongoose');
var _models 		= 	require('../models');
var packageModel    = _models.packageModel;
var rateModel       = _models.rateModel;
var imagesModel     = _models.imagesModel;
var itenaryModel   = _models.itenaryModel;
var ec 				= 	require('../../constants').errors;
var lib 			=	require('../../lib');
var middlewares 	= 	lib.middlewares; 


function savePackageImages(){
	var deferred = Q.defer();
	var self = this; 
	var reqObj = {
			package_images:[]
		} 
		for(var k in self.files){
			reqObj.package_images.push(self.files[k].path);
		};
	 var newPackImages = new imagesModel(reqObj);
 	newPackImages.save(function(err, data){
 		if(err) return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to Save Package images"}));
 		self.imagesId = data._id;
  			deferred.resolve();
 			
	});
	return deferred.promise;
}
  function savePackageRate(){
 	var deferred = Q.defer();
 	var self = this;
 	var otherDetails = self.data; 
 	var reqObj = { 
 		'package_rate':otherDetails.rate,
 		'package_days':otherDetails.days,
 		'package_nights':otherDetails.nights
 	}
 	var newPackRates = new rateModel(reqObj);
 	newPackRates.save(function(err, data){
 		if(err) return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to Save Package rates"}));
 		self.rateId = data._id;
         deferred.resolve();
	});
	return deferred.promise; 
 
 }
 function savePackageItenary(){
 	var deferred = Q.defer();
 	var self = this;
 	var otherDetails = self.data; 
 	var reqObj = { 
 		'package_itenary':otherDetails.itenary
 	};
 	var newPackItenary = new itenaryModel(reqObj);
 	newPackItenary.save(function(err, data){
 		if(err) return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to Save Package rates"}));
 		self.itenaryId = data._id;
 		deferred.resolve();
 	});
 	return deferred.promise; 
 }
 function savePackageDetails(){
 	var deferred = Q.defer();
 	var self = this;
 	var otherDetails = self.data;  
 	var reqObj = {
 		        'category':otherDetails.category,
 		        'type':otherDetails.type,
 				'country':otherDetails.country,
 				'state':otherDetails.state,
 				'city':otherDetails.city,
 				'sourceCity':otherDetails.sourceCity,
 				'title':otherDetails.title,
 				'highlights':otherDetails.highlights,
 				'description':otherDetails.description,
 				'selectedInclusion':otherDetails.selectedInclusion,
 				'imagesId':self.imagesId,
 				'rateId':self.rateId,
 				'itenaryId':self.itenaryId
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
 
  function getPackageDetails(){
 	var deferred = Q.defer();
 	var self = this;  
 	packageModel.find({},function(err, data){
 		if(err) return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to Fetch Package details"}));
 		self.packages = {};
 		self.packages = data; 
		deferred.resolve();
	});
	return deferred.promise;  
 }
  


var packageServ = {
	 
	addPackageService: function(options,cb){ 
		options.data = JSON.parse(options.data);
		if(!options)
			 return cb(ec.Error({status:ec.INSUFFICENT_DATA, message :"Invalid data to add Package"}));
		savePackageImages.call(options)
		   .then(savePackageRate.bind(options))
		   .then(savePackageItenary.bind(options)) 
           .then(savePackageDetails.bind(options)) 
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
            //.then(getOtherDetails.bind(options)) 
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
		if(!options.packageId)
			return cb(ec.Error({status:ec.INSUFFICENT_DATA, message :"Insufficiant data to fetch package details."}));
		packageModel.aggregate([
			{
				$match:{_id:mongoose.Types.ObjectId(options.packageId)}
			},{
				$lookup:{
				   from: 'admin_packageimages',
			       localField: 'imagesId',
			       foreignField: '_id',
			       as: 'images'
				}
			},
			{
				$lookup:{
				   from: 'admin_rates',
			       localField: 'rateId',
			       foreignField: '_id',
			       as: 'rate'
				}
			},
			{
				$lookup:{
				   from: 'admin_itenaries',
			       localField: 'itenaryId',
			       foreignField: '_id',
			       as: 'itenaries'
				}
			},
			{
				$project:{
					'images._id':0,
					'images.metadata':0,
					'images._v':0,
					'rate._id':0,
					'rate.metadata':0,
					'rate._v':0,
					'itenaries._id':0,
					'itenaries.metadata':0,
					'itenaries._v':0,
				}
			}
		], function(err, data){
			if(err) cb(ec.Error({status:ec.INSUFFICENT_DATA, message :"Insufficiant data to upload images."}));
			 
			cb(null,data)
		});
	}
};
module.exports = packageServ;
