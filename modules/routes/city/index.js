'use strict';
var cityCtrl = require('./city');
var mongoose  = require('mongoose');
var error 	 = require('../../error');


module.exports = function(app){
 
	app.route('/api/city')
		.post(cityCtrl.addCityCtrl, error)
		.get(cityCtrl.getCityCtrl, error)
		.put(cityCtrl.updateCityCtrl, error)
		
	app.route('/api/city/:id')
	 .get(cityCtrl.cityByIdCtrl, error)
	 .delete(cityCtrl.deleteCityCtrl, error)


}	