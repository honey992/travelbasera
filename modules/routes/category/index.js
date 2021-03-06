'use strict';
var categoryCtrl 		= require('./categories');
var mongoose   		= require('mongoose');
var lib 	   		= require('../../../lib');
var error 	 = require('../../error');
var uploadFiles 	= lib.uploadFiles('ss');


module.exports = function(app){

	app.route('/api/category')
		.post(uploadFiles.upload, categoryCtrl.addCategoryCtrl, error)
		.put(uploadFiles.upload, categoryCtrl.updateCategoryCtrl, error) 
		.get(categoryCtrl.getCategoryCtrl, error)   
	app.route('/api/category/:id')
		.delete( categoryCtrl.deleteCategoryCtrl, error)

//WEB API
	app.route('/v1/api/categories')
		.get(categoryCtrl._getCategoriesCtrl, error)
	 
}