'use strict';
var countryCtrl = require('./country');
var mongoose  = require('mongoose');
var error 	 = require('../../error');



module.exports = function(app){

	app.route('/api/getAllCountry')
		.get(countryCtrl.getAllCountryCtrl, error) 
	app.route('/api/addCountry')
		.post(countryCtrl.addCountryCtrl, error)
	app.route('/api/updateCountry')
		.put(countryCtrl.editCountryCtrl, error) 
	app.route('/api/deleteCountry/:id')
		.delete(countryCtrl.deleteCountryCtrl, error) 
	app.route('api/fetchSingleCountry/:id')
		.get(countryCtrl.fetchCountryByIdCtrl, error)
}	