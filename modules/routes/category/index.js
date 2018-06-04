'use strict';
var categoryCtrl 		= require('./categories');
var mongoose   		= require('mongoose');
var lib 	   		= require('../../../lib');
var error 	 = require('../../error');
var uploadFiles 	= lib.uploadFiles('ss');


module.exports = function(app){

	app.route('/api/category')
		.post(uploadFiles.upload, categoryCtrl.addCategoryCtrl, error) 
		.get(categoryCtrl.getCategoryCtrl, error)   
	 
}