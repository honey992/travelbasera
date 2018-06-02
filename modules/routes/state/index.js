'use strict';
var stateCtrl = require('./state');
var mongoose  = require('mongoose');
var error 	 = require('../../error');
var lib 	   		= require('../../../lib');
var uploadFiles 	= lib.uploadFiles('ss');


module.exports = function(app){
 
	app.route('/api/state')
		.post(stateCtrl.addStateCtrl, error)
		.get(stateCtrl.getStateCtrl, error)
		.put(stateCtrl.updateStateCtrl, error)
		
	app.route('/api/state/:id')
	 .get(stateCtrl.stateByIdCtrl, error)
	 .delete(stateCtrl.deleteStateCtrl, error)


}	