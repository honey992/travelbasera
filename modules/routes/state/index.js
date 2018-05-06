'use strict';
var stateCtrl = require('./state');
var mongoose  = require('mongoose');



module.exports = function(app){
 
	app.route('/api/state')
		.post(stateCtrl.addStateCtrl)
		.get(stateCtrl.getStateCtrl)
		.put(stateCtrl.updateStateCtrl)
		
	app.route('/api/state/:id')
	 .get(stateCtrl.stateByIdCtrl)
	 .delete(stateCtrl.deleteStateCtrl)


}	