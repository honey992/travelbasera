'use strict';
var countryCtrl = require('./country');
var mongoose  = require('mongoose');



module.exports = function(app){

	app.route('/api/addCountry')
		.post(countryCtrl.addCountryCtrl)
	app.route('/api/editCountry')
	.post(countryCtrl.editCountryCtrl) 
}