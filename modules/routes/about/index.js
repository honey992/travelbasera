'use strict';
var aboutCtrl = require('./about');
var mongoose  = require('mongoose');



module.exports = function(app){

	app.route('/api/aboutus')
		.post(aboutCtrl.addAboutCtrl)
		.get(aboutCtrl.getAboutCtrl)
		.put(aboutCtrl.updateAboutCtrl)  
	 
}