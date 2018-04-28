'use strict';

var mongoose  = require('mongoose');
var testimonialsCtrl = require('./testimonials');
var lib 	   		= require('../../../lib');
var uploadFiles 	= lib.uploadFiles('ss');



module.exports = function(app){

	app.route('/api/user-reviews')
		.post(uploadFiles.upload, testimonialsCtrl.addReviewCtrl) 
		.get(testimonialsCtrl.getReviewsCtrl)
	app.route('/api/getReviewsById')
		.get(testimonialsCtrl.fetchReviewsByIdCtrl)


	 
}