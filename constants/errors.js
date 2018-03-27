'use strict';

let define = require('node-constants')(exports);

define("INVALID_DATA", 400); //BAD REQUEST
define("UNAUTHORIZED_ACCESS", 401); //Unauthorised
define("NOT_FOUND", 404);
define("NOT_ACCEPTABLE", 406);
define("DATA_ALREADY_EXISTS", 409);
define("DB_ERROR", 417);
define("INSUFFICENT_DATA", 424);
define("LOGIN_FAILURE", 436);
define("UNKNOWN_ERROR", 437);
define("INTERNAL_ERROR", 438);
define("CONFLICT", 409);
define("PRECONDITION_FAILED", 412);
define("FORBIDDEN", 403);

var appError = function(obj){
	if(obj){
		var err = new Error();
			err.status  = obj.status;
			err.message = obj.message || 'Internal Error';	
			return err;	
	} 
};

define('Error', appError);