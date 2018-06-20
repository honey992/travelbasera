var _ 				            = 	require('lodash');
var Q 				            =	require('q');
var termAndConditionModel 		= 	require('../models').termAndConditionModel;
var ec 				            = 	require('../../constants').errors;
var lib 			            =	require('../../lib');
var middlewares 	            = 	lib.middlewares; 

var TermAndConditionServ = {

	addTermAndConditionService:function(options, cb){
		 if(!options || !options.description)
            return cb(ec.Error({status:ec.INSUFFICENT_DATA, message :"Invalid data to save Term and Condition."}));
        var reqObj = new termAndConditionModel(options);
		reqObj.save( function(err, data){
            if(err) return cb(ec.Error({status:ec.DB_ERROR, message:"Unable to save Term and Condition."}));
                cb(null, data);
        })
	},  
	getTermAndConditionServices: function(options,cb){
		termAndConditionModel.findOne( function(err, data){
			if(err) return cb(ec.Error({status:ec.DB_ERROR, message:"Unable to get Term and Condition."}));
				cb(null, data);
		})
	},

	updateTermAndConditionService:function(options, cb){
		if(!options || !options.description)
            return cb(ec.Error({status:ec.INSUFFICENT_DATA, message :"Invalid data to update Term and Condition."}));
		 var updateData = {description:options.description};
        termAndConditionModel.update({_id:options._id},{$set:updateData}, function(err, data){
        if(err) 
            return cb(ec.Error({status:ec.DB_ERROR, message :"Unable to Update Term and Condition."}));
        cb(null, data);
    });
	}
};
module.exports = TermAndConditionServ;
