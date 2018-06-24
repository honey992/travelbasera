var _ 				= 	require('lodash');
var Q 				=	require('q');
var aboutModel 		= 	require('../models').aboutModel;
var ec 				= 	require('../../constants').errors;
var lib 			=	require('../../lib');
var middlewares 	= 	lib.middlewares; 
 

var aboutServ = {
	addAboutService:function(options, cb){

		 if(!options || !options.description)
            return cb(ec.Error({status:ec.INSUFFICENT_DATA, message :"Invalid data to save About us"}));
        var reqObj = new aboutModel(options);
		reqObj.save( function(err, data){
            if(err) return cb(ec.Error({status:ec.DB_ERROR, message:"Unable to save about us."}));
                cb(null, data);
        })
	},  
	getAboutServices: function(options,cb){
		aboutModel.findOne( function(err, data){
			if(err) return cb(ec.Error({status:ec.DB_ERROR, message:"Unable to get About us."}));
				cb(null, data);
		})
	},
		updateAboutService:function(options, cb){

		 if(!options || !options.description )
            return cb(ec.Error({status:ec.INSUFFICENT_DATA, message :"Invalid data to update About us"}));

		 var updateData = {description:options.description, sort_description:options.sort_description};
    aboutModel.update({_id:options._id},{$set:updateData}, function(err, data){
        if(err) 
            return cb(ec.Error({status:ec.DB_ERROR, message :"Unable to Update About us"}));
        cb(null, data);
    });
	},
    deleteRolesService:function(options, cb){

         if(!options  )
            return cb(ec.Error({status:ec.DB_ERROR, message :"Invalid data to delete About us"}));

        fetchRole.call(options)
            .then(deleteRole.bind(options)) 
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
module.exports = aboutServ;
