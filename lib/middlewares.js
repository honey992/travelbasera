'use strict';

var crypto          =  require('crypto'); 
var jwt				=	require('jsonwebtoken');
var jwtSecret = '12233425werweertmivncusoskauridjfvnch';
var encKey 		  =  "abcdefgijklmno1234561723";

	module.exports.cipher =  function(token){
		let cipher=crypto.createCipher('aes192', encKey);
    	let encToken=cipher.update(token,'utf8','hex');
    	return encToken+=cipher.final('hex');
}

	module.exports.decipher = function(token){
		let decipher=crypto.createDecipher('aes192',encKey);
	    let decToken=decipher.update(token,'hex','utf8');  
	     return decToken+=decipher.final('utf8');
	};

	module.exports.AuthToken = function(req, res, next){
 	var token = req.headers.authorization.split('Bearer ')[1];
 	 	console.log('sds')
	if(token){
		var currentUser = jwt.verify(token, jwtSecret);
		 
			next();
		}else{
			res.json({m:'TOken Not Found'})
		}
 

 }
 