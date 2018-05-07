'use strict';
var cityCtrl = require('./city');
var mongoose  = require('mongoose');



module.exports = function(app){

	app.route('/api/getAllCity')
		.get(cityCtrl.getAllCityCtrl) 
	app.route('/api/addCity')
		.post(cityCtrl.addCityCtrl)
	app.route('/api/updateCity')
		.put(cityCtrl.editCityCtrl) 
	app.route('/api/deleteCity/:id')
		.delete(cityCtrl.deleteCityCtrl) 
	app.route('api/fetchSingleCity/:id')
		.get(cityCtrl.fetchCityByIdCtrl)
}	