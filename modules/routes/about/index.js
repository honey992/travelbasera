'use strict';
var aboutCtrl = require('./about');
var mongoose  = require('mongoose');
var error 	 = require('../../error');



module.exports = function(app){

	app.route('/api/aboutus')
		.post(aboutCtrl.addAboutCtrl,error)
		.get(aboutCtrl.getAboutCtrl,error)
		.put(aboutCtrl.updateAboutCtrl,error)  
	 
}