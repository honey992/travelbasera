var _ 					= 	require('lodash');
var Q 					=	require('q');
var mongoose 			=	require('mongoose');
var _models 			= 	require('../models');
var packageModel    	= 	_models.packageModel;
var descriptionModel    = 	_models.descriptionModel;
var imagesModel     	= 	_models.imagesModel;
var itenaryModel   		= 	_models.itenaryModel;
var policyModel	   		=   _models.policyModel;
var ec 					= 	require('../../constants').errors;
var lib 				=	require('../../lib');
var middlewares 		= 	lib.middlewares; 


function savePackageImages(){
	var deferred = Q.defer();
	var self = this; 
	var reqObj = {
			package_images:[]
		} 
		debugger;
		for(var k in self.files){
			if(k != '0')
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
  function savePackageDescription(){
 	var deferred = Q.defer();
 	var self = this;
 	var otherDetails = self.data; 
 	var reqObj = { 
 		
 				'package_description':otherDetails.description,
 	}
 	var newPackDesc = new descriptionModel(reqObj);
 	newPackDesc.save(function(err, data){
 		if(err) return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to Save Package Description"}));
 		self.descriptionId = data._id;
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
 		if(err) return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to Save Package Itenary"}));
 		self.itenaryId = data._id;
 		deferred.resolve();
 	});
 	return deferred.promise; 
 }

 function savePackagePolicy(){
 	var deferred = Q.defer();
 	var self = this;
 	var otherDetails = self.data; 
 	var reqObj = {
 		'paymentPolicy' : otherDetails.paymentPolicy,
		'cancellationPolicy' : otherDetails.cancellationPolicy,
		'otherPolicy' : otherDetails.otherPolicy
 	};
 	var newPackagePolicy = new policyModel(reqObj);
 	newPackagePolicy.save(function(err, data){
 		if(err) return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to Save Package Policy"}));
 		self.policyId = data._id;
 		deferred.resolve();
 	});
 	return deferred.promise; 
 }
 function savePackageDetails(){
 	var deferred = Q.defer();
 	var self = this;
 	var otherDetails = self.data; 
 	console.log(JSON.stringify(otherDetails)) 
 	var reqObj = {
 		        'category':otherDetails.category,
 		        'type':otherDetails.type,
 				'country':otherDetails.country,
 				'state':otherDetails.state,
 				'city':otherDetails.city,
 				'sourceCity':otherDetails.sourceCity,
 				'title':otherDetails.title,
 				'highlights':otherDetails.highlights,
 				'rate'  :otherDetails.rate,
		 		'days'  :otherDetails.days,
		 		'nights':otherDetails.nights,
 				'selectedInclusion':otherDetails.selectedInclusion,
 				'imagesId':self.imagesId,
 				'descriptionId':self.descriptionId,
 				'itenaryId':self.itenaryId,
 				'policyId' : self.policyId,
 				'popular':otherDetails.popular,
 				'mainImage':self.files['0'].path,
 				'inclusions':otherDetails.inclusionList,
 				'exclusions':otherDetails.exclusionList
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
		   .then(savePackageDescription.bind(options))
		   .then(savePackageItenary.bind(options)) 
		   .then(savePackagePolicy.bind(options)) 
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
				   from: 'admin_package_descriptions',
			       localField: 'descriptionId',
			       foreignField: '_id',
			       as: 'description'
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
				$lookup:{
				   from: 'admin_package_policies',
			       localField: 'policyId',
			       foreignField: '_id',
			       as: 'policies'
				}
			},
			{
				$project:{
					'images._id':0,
					'images.metadata':0,
					'images._v':0,
					'description._id':0,
					'description.metadata':0,
					'description._v':0,
					'itenaries._id':0,
					'itenaries.metadata':0,
					'itenaries._v':0,
					'policies._id':0,
					'policies.metadata':0,
					'policies._v':0,
				}
			}
		], function(err, data){
			if(err) cb(ec.Error({status:ec.DB_ERROR, message :"Unable to get data."}));
			 
			cb(null,data)
		});
	},
	getPackagesByCityService : function(options, cb){
		if(!options.cityId)
			return cb(ec.Error({status:ec.INSUFFICENT_DATA, message :"Insufficiant data to get results."}));
		packageModel.find({city:options.cityId, 'metadata.is_active':true}, function(err, data){
			if(err) return cb(ec.Error({status:ec.INSUFFICENT_DATA, message :"Unable to get data"}));
			cb(null, data);
		})
		},
	_PackageDetailsService: function(options, cb){
		if(!options) 
			 return cb(ec.Error({status:ec.INSUFFICENT_DATA, message :"Insufficiant data to upload images."}));
			var titleName = options.title.trim();
			debugger;
		packageModel.aggregate([
			{
				$match:{'title':titleName,'metadata.is_active':true}
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
				   from: 'admin_package_descriptions',
			       localField: 'descriptionId',
			       foreignField: '_id',
			       as: 'description'
				}
			},
			{
				$lookup:{
				   from: 'admin_itenaries',
			       localField: 'itenaryId',
			       foreignField: '_id',
			       as: 'itenaries'
				}
			},{
				$lookup:{
				   from: 'admin_package_policies',
			       localField: 'policyId',
			       foreignField: '_id',
			       as: 'policies'
				}
			},
			{
				$project:{
					'images._id':0,
					'images.metadata':0,
					'images._v':0,
					'description._id':0,
					'description.metadata':0,
					'description._v':0,
					'itenaries._id':0,
					'itenaries.metadata':0,
					'itenaries._v':0,
					'policies._id':0,
					'policies.metadata':0,
					'policies._v':0,
				}
			}
		], function(err, data){
			if(err) cb(ec.Error({status:ec.DB_ERROR, message :"Unable to get data."}));
			 debugger;
			cb(null,data)
		});
	},
	_getPopularService: function(options, cb){
		if(!options) 
			 return cb(ec.Error({status:ec.INSUFFICENT_DATA, message :"Insufficiant data to upload images."}));
		packageModel.find({popular:true, 'metadata.is_active':true}, function(err, data){
			if(err) return cb(ec.Error({status:ec.INSUFFICENT_DATA, message :"Unable to get data"}));
			cb(null, data);
		})
	}
};
module.exports = packageServ;
