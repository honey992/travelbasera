'use strict';

var mongoose  = require('mongoose');
var testimonialsCtrl = require('./testimonials');
var lib 	   		= require('../../../lib');
var uploadFiles 	= lib.uploadFiles('ss');
var error 	 = require('../../error');


module.exports = function(app){

	app.route('/api/user-reviews')
		.post(uploadFiles.upload, testimonialsCtrl.addReviewCtrl, error) 
		.get(testimonialsCtrl.getReviewsCtrl, error)
	app.route('/api/getReviewsById')
		.get(testimonialsCtrl.fetchReviewsByIdCtrl, error)
	app.route('/api/user-reviews/:id')
		.delete(testimonialsCtrl.deleteReviewsCtrl, error)


	 
}