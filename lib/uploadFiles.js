'use Strict';

var multer = require('multer');


module.exports = function(){ 
 var reNamed;
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
    	console.log("Filleee=", file);
        reNamed = file.originalname.substring(0,file.originalname.lastIndexOf('.')) + '-' + Date.now() + file.originalname.substring(file.originalname.lastIndexOf('.'),file.originalname.length);
        callback(null, reNamed);
    }
    
});

return{
	 upload : multer({ storage : storage}).single('file'),
	 renamedFile:reNamed
}


}