'use strict';
var careerCtrl 		= require('./career');
var mongoose   		= require('mongoose');
var lib 	   		= require('../../../lib');
var error 	 		= require('../../error'); 


module.exports = function(app){

	app.route('/api/career')
		.post(careerCtrl.addOpeningCtrl, error)
		.get(careerCtrl.getOpeningCtrl, error) 

	app.route('/v1/api/career')
		.get(careerCtrl._fetchCareersCtrl, error)

 
	 
}