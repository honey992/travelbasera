'use Strict';

var multer = require('multer');
 var fs = require('fs-extra');
  
module.exports = function(){ 
var reNamed, path;
var storage = multer.diskStorage({
    destination: function (req, file, callback) {

        if(req.url == '/api/uploadBanners') path = './uploads/banners';
        else if(req.url == '/api/user-reviews') path = './uploads/testimonials';
        else if(req.url == '/api/inclusions') path = './uploads/inclusions';
        else if(req.url == '/api/uploadImages') path = "./uploads/packages";
        else if(req.url == '/api/packages') path = "./uploads/packages";
         else if(req.url == '/api/category') path = "./uploads/categories";
        fs.mkdirsSync(path); 
        callback(null, path);
    },
    filename: function (req, file, callback) {
    	console.log("Filleee=", file);
        reNamed = file.originalname.substring(0,file.originalname.lastIndexOf('.')) + '-' + Date.now() + file.originalname.substring(file.originalname.lastIndexOf('.'),file.originalname.length);
        callback(null, reNamed);
    }
    
});
   
return{
	 upload : multer({ storage : storage}).single('file'),
     multiUpload : multer({ storage : storage}).any(),
	 renamedFile:reNamed
}


}