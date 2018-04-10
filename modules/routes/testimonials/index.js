'use strict';

var mongoose  = require('mongoose');
var testimonialsCtrl = require('./testimonials');
var lib 	   		= require('../../../lib');
var uploadFiles 	= lib.uploadFiles('ss');



module.exports = function(app){

	app.route('/api/addNewReview')
		.post(uploadFiles.upload, testimonialsCtrl.addReviewCtrl) 
	 
}