'use strict';
var cityCtrl = require('./city');
var mongoose  = require('mongoose');
var lib 	   		= require('../../../lib');
 var uploadFiles 	= lib.uploadFiles('ss');
var error 	 = require('../../error');


module.exports = function(app){
 
	app.route('/api/city')
		.post(uploadFiles.upload,cityCtrl.addCityCtrl, error)
		.get(cityCtrl.getCityCtrl, error)
		.put(uploadFiles.upload,cityCtrl.updateCityCtrl, error)
		
	app.route('/api/city/:id')
	 .get(cityCtrl.cityByIdCtrl, error)
	 .delete(cityCtrl.deleteCityCtrl, error)

	app.route('/v1/api/cityByStates/:stateId')
		.get(cityCtrl._cityByStatesCtrl, error)


}	