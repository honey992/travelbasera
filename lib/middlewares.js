'use strict';

var crypto          =  require('crypto'); 
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
 