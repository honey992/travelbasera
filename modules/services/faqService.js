var _ 				= 	require('lodash');
var jwt				=	require('jsonwebtoken');
var Q 				=	require('q');
var _faq     		= 	require('../models');
var faqModel    	=  _faq.faqModel;
var ec 				= 	require('../../constants').errors;
var lib 			=	require('../../lib');
var middlewares 	= 	lib.middlewares; 

var faqService = {

	getAllFaqService:function(options, cb){	
		if(!options)
            return cb(ec.Error({status:ec.DB_ERROR, message :"No data"}));
		faqModel.find({},function(err, data){
			if(err)
				return cb(ec.Error({status:ec.DB_ERROR, message :"Unable to Fetch FAQs"}));
				cb(null,data);
		});
	},

	addFaqService:function(options, cb){
	console.log(options);
		if(!options)
            return cb(ec.Error({status:ec.DB_ERROR, message :"Invalid data to create FAQs"}));
        var newData = new faqModel(options);
        newData.save(function(err, data){
			if(err)
				return cb(ec.Error({status:ec.DB_ERROR, message:'Unable to add FAQs'}));
			cb(null, data);
		});


	},
	
	updateFaqService:function(options, cb){
		if(!options)
            return cb(ec.Error({status:ec.DB_ERROR, message :"Invalid data to create FAQs"}));
        var updateAbleData =  {  question:options.question, answer:options.answer, metadata:{is_active:options.metadata.is_active}};
		faqModel.update({_id:options._id},{$set:updateAbleData}, function(err, data){
			if(err)
				return cb(ec.Error({status:ec.DB_ERROR, message:'Unable to Update FAQs'}));
			cb(null, data);
		});
	},

	deleteFaqService: function(options, cb){		
		faqModel.remove({_id:options.id}, function(err, result){
			if(err) return cb(ec.Error({status:ec.DB_ERROR, message:'Unable to delete FAQs'}));
			cb(null, result);
		});
	}
};
module.exports = faqService;
