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
var fs 					=   require('fs');


function savePackageImages(){
	var deferred = Q.defer();
	var self = this; 
	var reqObj = {
			package_images:[]
		} 
		console.log('Files========', self.files);
		self.mainImage = self.files['0'].path;
		delete self.files['0'];
		var fileLen = Object.keys(self.files).length.toString();
		if(self.data.discount == 'Yes'){
			self.discountImage = self.files[fileLen].path;
		   delete self.files[fileLen];
		} 
		console.log('Final Images=', self.files)
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
 				'mainImage':self.mainImage,
 				'discountImage':self.discountImage,
 				'discountApplied':otherDetails.discount,
 				'discountRate':otherDetails.discountRate,
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

 function fetchPackageDetails(){
 	var deferred = Q.defer();
 	var self = this;  
 	packageModel.findOne({_id:self.id},function(err, data){ if(err) return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to Fetch Package details"}));
 		self.packages = {};
 		self.package = data._doc;  
		deferred.resolve();
	});
	return deferred.promise;  

 }
 function deletePackageImages(){
 	var deferred = Q.defer();
 	var self = this;  
 	imagesModel.remove({_id:self.package.imagesId},function(err, data){
 		if(err) return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to deleter Package images"}));
		deferred.resolve();
	});
	return deferred.promise; 
 }
 function deletePackageDescription(){
 	var deferred = Q.defer();
 	var self = this;  
 	descriptionModel.remove({_id:self.package.descriptionId},function(err, data){
 		if(err) return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to deleter Package description"}));
		deferred.resolve();
	});
	return deferred.promise; 
 }
 function deletePackageItenary(){
 	var deferred = Q.defer();
 	var self = this;  
 	itenaryModel.remove({_id:self.package.itenaryId},function(err, data){
 		if(err) return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to deleter Package itenary"}));
		deferred.resolve();
	});
	return deferred.promise; 
 }
 function deletePackagePolicy(){
 	var deferred = Q.defer();
 	var self = this;  
 	policyModel.remove({_id:self.package.policyId},function(err, data){
 		if(err) return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to delete Package Policies"}));
		deferred.resolve();
	});
	return deferred.promise; 
 }
 function deletePackageDetails(){
 	var deferred = Q.defer();
 	var self = this;  
 	packageModel.remove({_id:self.id},function(err, data){
 		if(err) return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to delete Package"}));
		deferred.resolve();
	});
	return deferred.promise; 
 }

 function updatePackageImages(){
 	var deferred = Q.defer();
 	var self = this;  
 	var imagesId  = self.data.imagesId;
 	var package_images = []; 
 	if(self.data.mainImageChanged){
 		self.mainImage = self.files['0'].path;
		delete self.files['0'];
 	}
 	if(self.data.discountImageChanged && self.data.discount == 'Yes'){
 		var fileLen = Object.keys(self.files).length;
 		if(!self.data.mainImageChanged) fileLen = fileLen-1;
		self.discountImage = self.files[fileLen.toString()].path;
		delete self.files[fileLen];
 	}   
	for(var k in self.files){ 
		package_images.push(self.files[k].path); 
	};  
 	imagesModel.update({_id:imagesId}, {$push:{'package_images':{$each:package_images}}}, function(err, data){
 		if(err)  return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to update images "}));
 		deferred.resolve();
 	});
 	return deferred.promise;
 }

 function updatePackageDescription(){
 	var deferred = Q.defer();
 	var self = this;
 	var descId = self.data.descriptionId;
 	descriptionModel.update({_id:descId}, {$set:{'package_description':self.data.description}}, function(err, data){
 		if(err)  return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to update description of package"}));
 		deferred.resolve();
 	});
 	return deferred.promise;
 }

 function updatePackageItenary(){
 	var deferred = Q.defer();
 	var self = this;
 	var _id = self.data.itenaryId;
 	itenaryModel.update({_id:_id}, {$set:{'package_itenary':self.data.itenary}}, function(err, data){
 		if(err)  return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to update itenaries"}));
 		deferred.resolve();
 	});
 	return deferred.promise;
 }
  
  function updatePackagePolicy(){
 	var deferred = Q.defer();
 	var self = this;
 	var otherDetails = self.data; 
 	var updateData = {
 		'paymentPolicy' : otherDetails.paymentPolicy,
		'cancellationPolicy' : otherDetails.cancellationPolicy,
		'otherPolicy' : otherDetails.otherPolicy
 	};
 	var _id = otherDetails.policyId; 
 	policyModel.update({_id:_id},{$set:updateData},function(err, data){
 		if(err) return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to Update Package Policy"})); 
 		deferred.resolve();
 	});
 	return deferred.promise; 
 }

 function updatePackageDetails(){
 	var deferred = Q.defer();
 	var self = this;
 	var otherDetails = self.data; 
 	var updateData = {
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
 				'popular':otherDetails.popular, 
 				'discountApplied':otherDetails.discount,
 				'discountRate':otherDetails.discountRate,
 				'inclusions':otherDetails.inclusionList,
 				'exclusions':otherDetails.exclusionList
    };
    if(self.data.mainImageChanged) updateData['mainImage'] = self.mainImage;
 	if(self.data.discountImageChanged && self.data.discount == 'Yes')  updateData['discountImage'] = self.discountImage;; 
    debugger;   
    console.log(updateData)
 	packageModel.update({_id:self.data._id},{$set:updateData},function(err, data){
 		debugger;
 		if(err) return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to Save Package details"}));
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
	updatePackageService: function(options, cb){
		options.data = JSON.parse(options.data);
		if(!options)
			 return cb(ec.Error({status:ec.INSUFFICENT_DATA, message :"Invalid data to add Package"}));
		updatePackageImages.call(options)
		   .then(updatePackageDescription.bind(options))
		   .then(updatePackageItenary.bind(options)) 
		   .then(updatePackagePolicy.bind(options)) 
           .then(updatePackageDetails.bind(options)) 
            .then(cb)
            .fail(failureCb)
            .catch(failureCb)

        function failureCb(err){
            var finalErr = new Error(err.message || 'Some Undefined Error Occurs.');
            finalErr.status = err.status || 400;
            return cb(finalErr);
        }
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
	deletePackageService:function(options, cb){
		fetchPackageDetails.call(options)
            .then(deletePackageImages.bind(options))
		   .then(deletePackageDescription.bind(options))
		   .then(deletePackageItenary.bind(options)) 
		   .then(deletePackagePolicy.bind(options)) 
           .then(deletePackageDetails.bind(options)) 
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
	removeImageService: function(options, cb){
		debugger;
		if(!options.id)
			return cb(ec.Error({status:ec.INSUFFICENT_DATA, message :"Insufficiant data to delete Image."}));
		var updateData = {$set:{'mainImage':'null'}};
		var updateModel = packageModel;
		if(options.type =='multiImages'){
			updateData = {$pull:{"package_images":options.imgPath}};
			updateModel = imagesModel; 
		}
		if(options.type == 'discountImg') 
			updateData= {$set:{'discountImage':'null'}};
debugger;
		console.log(updateData); 
		updateModel.update({_id:options.id, 'metadata.is_active':true},updateData, function(err, data){
			if(err) return cb(ec.Error({status:ec.INSUFFICENT_DATA, message :"Unable to remove Image"}));
			
			else{
				debugger;
				fs.unlink(options.imgPath, function(err, res){
					cb(null, data);
				});
			}
		})
	},
	_PackageDetailsService: function(options, cb){
		if(!options) 
			 return cb(ec.Error({status:ec.INSUFFICENT_DATA, message :"Insufficiant data to get Data."}));
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
			 return cb(ec.Error({status:ec.INSUFFICENT_DATA, message :"Insufficiant data to get Data."}));
		packageModel.find({popular:true, 'metadata.is_active':true}, function(err, data){
			if(err) return cb(ec.Error({status:ec.INSUFFICENT_DATA, message :"Unable to get data"}));
			cb(null, data);
		})
	},
	_getPackageByCategory: function(options, cb){
	debugger; 
		if(!options.id)
			return cb(ec.Error({status:ec.INSUFFICENT_DATA, message :"Insufficiant data to get Data."}));
		packageModel.find({category:{$in:[options.id]},'metadata.is_active':true}, function(err, data){
			if(err) return cb(ec.Error({status:ec.INSUFFICENT_DATA, message :"Unable to get data"}));
			cb(null, data);
		}) 
	},
	_searchPackageService: function(options, cb){
		if(!options) 
			 return cb(ec.Error({status:ec.INSUFFICENT_DATA, message :"Insufficiant data to upload images."}));
	 var searchQuery = {'metadata.is_active':true};
	 if(options.source) searchQuery.sourceCity = options.source;
	 if(options.destination) searchQuery.city = {$regex:options.destination,$options: '-i'}; 
		packageModel.aggregate([
			{
				$match:searchQuery
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
	} ,
	_discountedPackageService: function(options, cb){
		if(!options)
			return cb(ec.Error({status:ec.INSUFFICENT_DATA, message :"Insufficiant data to get Data."}));
		packageModel.find({discountApplied:'Yes','metadata.is_active':true}, function(err, data){
			if(err) return cb(ec.Error({status:ec.INSUFFICENT_DATA, message :"Unable to get data"}));
			cb(null, data);
		}) 
	}
};
module.exports = packageServ;
