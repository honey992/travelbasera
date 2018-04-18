'use strict';
var countryCtrl = require('./country');
var mongoose  = require('mongoose');



module.exports = function(app){

	app.route('/api/getAllCountry')
		.get(countryCtrl.getAllCountryCtrl) 
	app.route('/api/addCountry')
		.post(countryCtrl.addCountryCtrl)
	app.route('/api/editCountry')
		.post(countryCtrl.editCountryCtrl) 
	app.route('/api/deleteCountry')
		.post(countryCtrl.deleteCountryCtrl) 
	app.route('api/fetchSingleCountry')
		.get(countryCtrl.fetchCountryByIdCtrl)
}	