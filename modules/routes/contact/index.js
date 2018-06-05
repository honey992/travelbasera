'use strict';
var contactusCtrl = require('./contactus');
var mongoose  = require('mongoose');
var error 	 = require('../../error');



module.exports = function(app){

	app.route('/api/contactus')
		.post(contactusCtrl.addContactusCtrl, error) 
		.get(contactusCtrl.getContactusCtrl, error) 
		.put(contactusCtrl.updateContactusCtrl, error)
	 
}