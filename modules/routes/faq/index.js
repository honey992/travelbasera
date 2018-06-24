'use strict';
var faqCtrl = require('./faq');
var mongoose  = require('mongoose');
var error 	 = require('../../error');



module.exports = function(app){

	app.route('/api/faq')
		.post(faqCtrl.addFaqCtrl,error)
		.get(faqCtrl.getFaqCtrl,error)
		.put(faqCtrl.updateFaqCtrl,error)  
		
	app.route('/api/faq/:id')
	 	.delete(faqCtrl.deleteFaqCtrl,error) 


//APi for web
 app.route('/v1/api/faq')
 	.get(faqCtrl._getFaqsCtrl, error)
}