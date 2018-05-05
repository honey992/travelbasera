'use strict';
var stateCtrl = require('./state');
var mongoose  = require('mongoose');



module.exports = function(app){
 
	app.route('/api/state')
		.post(stateCtrl.addStateCtrl)
}	